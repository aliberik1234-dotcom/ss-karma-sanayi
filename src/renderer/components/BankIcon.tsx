import React from 'react';
import { Building2 } from 'lucide-react';
import akbank from '../assets/banks/akbank.png';
import albarakaTurk from '../assets/banks/albaraka_turk.png';
import alternatifBank from '../assets/banks/alternatif_bank.png';
import burganBank from '../assets/banks/burgan_bank.png';
import denizBank from '../assets/banks/deniz_bank.png';
import emlakKatilim from '../assets/banks/emlak_katılım.png';
import fibaBankasi from '../assets/banks/fiba_bankası.png';
import garantiBankasi from '../assets/banks/garanti_bankası.png';
import halkbank from '../assets/banks/halkbank.png';
import hsbc from '../assets/banks/hsbc.png';
import icbc from '../assets/banks/icbc.png';
import ing from '../assets/banks/ing.png';
import isBankasi from '../assets/banks/is_bankasi.png';
import kuveytTurk from '../assets/banks/kuveyt_turk.png';
import odeaBank from '../assets/banks/odea_bank.png';
import qnb from '../assets/banks/qnb.png';
import sekerBank from '../assets/banks/seker_bank.png';
import teb from '../assets/banks/teb.png';
import turkiyeFinans from '../assets/banks/turkiye_finans.png';
import vakifBank from '../assets/banks/vakif_bank.png';
import vakifKatilim from '../assets/banks/vakif_katilim.png';
import yapiKredi from '../assets/banks/yapi_kredi.png';
import ziraatBankasi from '../assets/banks/ziraat_bankasi.png';
import ziraatKatilim from '../assets/banks/ziraat_katılım.png';

 const BANK_LOGOS: Record<string, string> = {
  'banks/akbank.png': akbank,
  'banks/albaraka_turk.png': albarakaTurk,
  'banks/alternatif_bank.png': alternatifBank,
  'banks/burgan_bank.png': burganBank,
  'banks/deniz_bank.png': denizBank,
  'banks/emlak_katılım.png': emlakKatilim,
  'banks/fiba_bankası.png': fibaBankasi,
  'banks/garanti_bankası.png': garantiBankasi,
  'banks/halkbank.png': halkbank,
  'banks/hsbc.png': hsbc,
  'banks/icbc.png': icbc,
  'banks/ing.png': ing,
  'banks/is_bankasi.png': isBankasi,
  'banks/kuveyt_turk.png': kuveytTurk,
  'banks/odea_bank.png': odeaBank,
  'banks/qnb.png': qnb,
  'banks/seker_bank.png': sekerBank,
  'banks/teb.png': teb,
  'banks/turkiye_finans.png': turkiyeFinans,
  'banks/vakif_bank.png': vakifBank,
  'banks/vakif_katilim.png': vakifKatilim,
  'banks/yapi_kredi.png': yapiKredi,
  'banks/ziraat_bankasi.png': ziraatBankasi,
  'banks/ziraat_katılım.png': ziraatKatilim,
  'banks/akbank.svg': akbank,
  'banks/albaraka.svg': albarakaTurk,
  'banks/alternatifbank.svg': alternatifBank,
  'banks/burgan.svg': burganBank,
  'banks/denizbank.svg': denizBank,
  'banks/emlakkatilim.svg': emlakKatilim,
  'banks/fibabanka.svg': fibaBankasi,
  'banks/garanti.svg': garantiBankasi,
  'banks/halkbank.svg': halkbank,
  'banks/hsbc.svg': hsbc,
  'banks/icbc.svg': icbc,
  'banks/ing.svg': ing,
  'banks/isbank.svg': isBankasi,
  'banks/kuveytturk.svg': kuveytTurk,
  'banks/odeabank.svg': odeaBank,
  'banks/qnb.svg': qnb,
  'banks/sekerbank.svg': sekerBank,
  'banks/teb.svg': teb,
  'banks/turkiyefinans.svg': turkiyeFinans,
  'banks/vakifbank.svg': vakifBank,
  'banks/vakifkatilim.svg': vakifKatilim,
  'banks/yapikredi.svg': yapiKredi,
  'banks/ziraat.svg': ziraatBankasi,
  'banks/ziraatkatilim.svg': ziraatKatilim,
};

export const BankIcon: React.FC<{ bankName?: string | null; logoAsset?: string | null; className?: string }> = ({
  bankName,
  logoAsset,
  className = 'w-6 h-6',
}) => {
  const logoUrl = logoAsset && BANK_LOGOS[logoAsset];

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={bankName || 'Banka'}
        className={`object-contain rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 ${className}`}
        title={bankName || 'Banka'}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-400 dark:text-slate-300 ${className}`} title={bankName || 'Banka'}>
      <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
    </div>
  );
};