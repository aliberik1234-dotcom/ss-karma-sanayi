import { PrismaClient } from '../../generated/prisma/index.js';
import { SecurityService } from '../services/securityService.js';

export const TURKISH_BANKS = [
  { name: 'Ziraat Bankası', code: 'TCZB', logoAsset: 'banks/ziraat_bankasi.png' },
  { name: 'Halkbank', code: 'HALK', logoAsset: 'banks/halkbank.png' },
  { name: 'VakıfBank', code: 'VAKF', logoAsset: 'banks/vakif_bank.png' },
  { name: 'Türkiye İş Bankası', code: 'ISBK', logoAsset: 'banks/is_bankasi.png' },
  { name: 'Garanti BBVA', code: 'GARAN', logoAsset: 'banks/garanti_bankası.png' },
  { name: 'Akbank', code: 'AKBNK', logoAsset: 'banks/akbank.png' },
  { name: 'Yapı Kredi', code: 'YKBNK', logoAsset: 'banks/yapi_kredi.png' },
  { name: 'QNB', code: 'QNBFB', logoAsset: 'banks/qnb.png' },
  { name: 'DenizBank', code: 'DENIZ', logoAsset: 'banks/deniz_bank.png' },
  { name: 'Türk Ekonomi Bankası (TEB)', code: 'TEBB', logoAsset: 'banks/teb.png' },
  { name: 'ING Bank', code: 'ING', logoAsset: 'banks/ing.png' },
  { name: 'HSBC', code: 'HSBC', logoAsset: 'banks/hsbc.png' },
  { name: 'Kuveyt Türk', code: 'KUVYT', logoAsset: 'banks/kuveyt_turk.png' },
  { name: 'Albaraka Türk', code: 'ALBRK', logoAsset: 'banks/albaraka_turk.png' },
  { name: 'Türkiye Finans', code: 'TFKB', logoAsset: 'banks/turkiye_finans.png' },
  { name: 'Fibabanka', code: 'FIBA', logoAsset: 'banks/fiba_bankası.png' },
  { name: 'Şekerbank', code: 'SEKER', logoAsset: 'banks/seker_bank.png' },
  { name: 'Odeabank', code: 'ODEA', logoAsset: 'banks/odea_bank.png' },
  { name: 'Alternatif Bank', code: 'ALNTF', logoAsset: 'banks/alternatif_bank.png' },
  { name: 'Burgan Bank', code: 'BURGN', logoAsset: 'banks/burgan_bank.png' },
  { name: 'ICBC Turkey', code: 'ICBC', logoAsset: 'banks/icbc.png' },
  { name: 'Ziraat Katılım', code: 'ZKTLM', logoAsset: 'banks/ziraat_katılım.png' },
  { name: 'Vakıf Katılım', code: 'VKTLM', logoAsset: 'banks/vakif_katilim.png' },
  { name: 'Emlak Katılım', code: 'EKTLM', logoAsset: 'banks/emlak_katılım.png' },
  { name: 'Diğer / Elden Nakit', code: 'OTHER', logoAsset: null }
];

export async function seedDatabase(client: PrismaClient) {
  console.log('[Seed] Lisanslı Türkiye Bankaları kontrol ediliyor...');
  for (const bank of TURKISH_BANKS) {
    await client.bank.upsert({
      where: { code: bank.code },
      update: { name: bank.name, logoAsset: bank.logoAsset, isActive: true },
      create: { name: bank.name, code: bank.code, logoAsset: bank.logoAsset, isActive: true }
    });
  }
  console.log(`[Seed] Toplam ${TURKISH_BANKS.length} banka kaydı doğrulandı.`);
}

export async function initializeDefaultAdmin(client: PrismaClient): Promise<void> {
  const existingAdmin = await client.adminUser.findUnique({
    where: { username: 'admin' }
  });

  if (existingAdmin) {
    return;
  }

  const adminPassHash = await SecurityService.hashPassword('123456');
  const privatePassHash = await SecurityService.hashPassword('1234567');

  const phonesEncrypted = SecurityService.encrypt(JSON.stringify({
    phone1: '05326912096',
    phone2: ''
  }));

  await client.$transaction(async (tx) => {
    await tx.adminUser.create({
      data: {
        username: 'admin',
        displayName: 'admin',
        passwordHash: adminPassHash
      }
    });

    await tx.privateCredential.create({
      data: {
        passwordHash: privatePassHash
      }
    });

    await tx.appSettings.upsert({
      where: { key: 'SECURITY_PHONES' },
      update: { value: phonesEncrypted, isEncrypted: true },
      create: { key: 'SECURITY_PHONES', value: phonesEncrypted, isEncrypted: true }
    });

    await tx.appSettings.upsert({
      where: { key: 'FIRST_RUN_SETUP_COMPLETED' },
      update: { value: 'true', isEncrypted: false },
      create: { key: 'FIRST_RUN_SETUP_COMPLETED', value: 'true', isEncrypted: false }
    });
  });

  await seedDatabase(client);
}
