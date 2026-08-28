import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Decimal from 'decimal.js';

// 1. TÜRKÇE NORMALİZASYON TESTLERİ
function toTurkishTitleCase(input) {
  if (!input) return '';
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      const lower = word.toLocaleLowerCase('tr-TR');
      const firstChar = lower.charAt(0).toLocaleUpperCase('tr-TR');
      const rest = lower.slice(1);
      return firstChar + rest;
    })
    .join(' ');
}

test('Türkçe İsim Normalizasyonu - Karışık Harf Testleri', () => {
  assert.equal(toTurkishTitleCase('bU bİR dENEME cÜMLESİ'), 'Bu Bir Deneme Cümlesi');
  assert.equal(toTurkishTitleCase('Bu BiR DeNeMe CüMLeSi'), 'Bu Bir Deneme Cümlesi');
  assert.equal(toTurkishTitleCase('İBRAHİM BERİK'), 'İbrahim Berik');
  assert.equal(toTurkishTitleCase('ibrahim berik'), 'İbrahim Berik');
  assert.equal(toTurkishTitleCase('İbrahim berik'), 'İbrahim Berik');
  assert.equal(toTurkishTitleCase('iBRAHİM bERİK'), 'İbrahim Berik');
  assert.equal(toTurkishTitleCase('ŞÜKRÜ ÖZÇELİK'), 'Şükrü Özçelik');
  assert.equal(toTurkishTitleCase('ğaziantep sanayi sitesi'), 'Ğaziantep Sanayi Sitesi');
});

// 2. FİNANSAL HESAPLAMA (SIFIR FLOAT) TESTLERİ
test('Finansal Hesaplama - Decimal.js Hassasiyeti', () => {
  const d1 = new Decimal('10000.50');
  const d2 = new Decimal('10000.50');
  assert.equal(d1.plus(d2).toFixed(2), '20001.00');

  const c1 = new Decimal('0.10');
  const c2 = new Decimal('0.20');
  assert.equal(c1.plus(c2).toFixed(2), '0.30');

  // Toplam Borç = Peşinat + 12 Taksit
  const downPayment = new Decimal('50000.00');
  const installmentAmount = new Decimal('12500.25');
  const totalInstallments = 12;
  const totalInstallmentDebt = installmentAmount.times(totalInstallments);
  const totalDebt = downPayment.plus(totalInstallmentDebt);

  assert.equal(totalDebt.toFixed(2), '200003.00');

  // 4 taksit ödendiğinde kalan bakiye
  const paid = downPayment.plus(installmentAmount.times(4));
  const remaining = totalDebt.minus(paid);
  assert.equal(remaining.toFixed(2), '100002.00');
});

// 3. KRİPTO & DPAPI / AES-256-GCM TESTLERİ
test('Kripto - AES-256-GCM Şifreleme ve Çözme', () => {
  const key = crypto.createHash('sha256').update('TEST_KEY_2026').digest();
  const iv = crypto.randomBytes(16);
  const plainText = JSON.stringify({ phone1: '0555 111 22 33', phone2: '0544 999 88 77' });

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  // Çözme
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  assert.equal(decrypted, plainText);
});

// 4. PAROLA DOĞRULAMA (BCRYPT / ARGON2)
test('Parola Hashleme ve Doğrulama', async () => {
  const password = 'GuvenliAdminSifresi2026!';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  assert.equal(await bcrypt.compare(password, hash), true);
  assert.equal(await bcrypt.compare('YanlisSifre', hash), false);
});

// 5. CANONICAL USERNAME NORMALİZASYONU
function normalizeUsername(username) {
  if (!username) return '';
  return username
    .trim()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase()
    .replace(/\u0307/g, '')
    .replace(/\s+/g, '');
}

test('Canonical Username Normalizasyonu', () => {
  assert.equal(normalizeUsername('Admin'), 'admin');
  assert.equal(normalizeUsername('admin'), 'admin');
  assert.equal(normalizeUsername('ADMIN'), 'admin');
  assert.equal(normalizeUsername('AdMiN'), 'admin');
  assert.equal(normalizeUsername('ADMİN'), 'admin');
  assert.equal(normalizeUsername('admın'), 'admin');
  assert.equal(normalizeUsername('  Ad Min  '), 'admin');
});

// 6. DEĞİŞTİRİLEMEZ AUDIT LOG ZİNCİRİ TESTİ
test('Tamper-Evident Audit Zincir Bütünlüğü ve Müdahale Tespiti', () => {
  function sha256(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
  }

  const logs = [];
  let prevHash = 'GENESIS_HASH_SS_KARMA_SANAYI_2026';

  // 3 Log Kaydı Oluştur
  const events = [
    { type: 'MEMBER_CREATE', actor: 'ADMIN', data: '{"id": 1}' },
    { type: 'FINANCIAL_UPDATE', actor: 'ADMIN', data: '{"plotSize": 500}' },
    { type: 'PAYMENT_RECORD', actor: 'ADMIN', data: '{"amount": 10000}' }
  ];

  for (const ev of events) {
    const payload = `${prevHash}|${ev.type}|${ev.actor}|${ev.data}`;
    const currentHash = sha256(payload);
    logs.push({ prevHash, currentHash, ...ev });
    prevHash = currentHash;
  }

  // Zincir Doğrulama Fonksiyonu
  function verifyChain(chain) {
    let expectedPrev = 'GENESIS_HASH_SS_KARMA_SANAYI_2026';
    for (const log of chain) {
      if (log.prevHash !== expectedPrev) return false;
      const expectedCurrent = sha256(`${log.prevHash}|${log.type}|${log.actor}|${log.data}`);
      if (log.currentHash !== expectedCurrent) return false;
      expectedPrev = log.currentHash;
    }
    return true;
  }

  // 1. Orijinal Zincir Geçerli Olmalı
  assert.equal(verifyChain(logs), true);

  // 2. Araya Sahte Değişiklik Yapılırsa (Tamper) Tespit Edilmeli
  const tamperedLogs = JSON.parse(JSON.stringify(logs));
  tamperedLogs[1].data = '{"plotSize": 9999}'; // Veri değiştirildi!
  assert.equal(verifyChain(tamperedLogs), false);
});
