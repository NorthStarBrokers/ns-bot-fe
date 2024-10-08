import type { BrandModel } from '../interfaces/brand-model'
import { brandToken } from '../config/environment/brandTokens'

export const brandList: BrandModel[] = [
  {
    image: '/images/logo_sendmecashtoday.png',
    name: 'Send me cash today',
    slug: 'sendmecashtoday',
    token: brandToken.smct,
    style: 'cashdepot',
    favicon: '/favicons/sendmecashtoday.ico',
    url: 'sendmecashtoday.ca',
    mail: 'info@sendmecashtoday.ca',
    companyId: 15,
    appHubId: '9',
    flinks: 'sendmecashtoday'
  },
  {
    image: '/images/logo_cashdepot_dark.png',
    name: 'Cash Depot',
    slug: 'cash-depot',
    token: brandToken.cd,
    style: 'cashdepot',
    favicon: '/favicons/cashdepot.ico',
    url: 'cash-depot.ca',
    mail: 'info@cash-depot.ca',
    companyId: 3,
    appHubId: '3',
    flinks: 'cashdepot'
  },
  {
    image: '/images/logo_cashdepot_dark.png',
    name: 'Dev 21 Cash Depot',
    slug: 'dev21cashdepot',
    token: brandToken.cd,
    style: 'cashdepot',
    favicon: '/favicons/cashdepot.ico',
    url: 'dev21.cash-depot.ca',
    mail: 'info@cash-depot.ca',
    companyId: 3,
    appHubId: '3',
    flinks: 'cashdepot'
  },
  {
    image: '/images/logo_getpaydayloans.png',
    name: 'Get payday loans',
    slug: 'getpaydayloans',
    token: brandToken.gpdl,
    style: 'getpaydayloans',
    favicon: '/favicons/getpaydayloans.ico',
    url: 'getpaydayloans.ca',
    mail: 'info@getpaydayloans.ca',
    companyId: 18,
    appHubId: '18',
    flinks: 'getpaydayloans'
  },
  {
    image: '/images/logo_cashnow2go.png',
    name: 'Cashnow2go',
    slug: 'cashnow2go',
    token: brandToken.cntg,
    style: 'cashdepot',
    favicon: '/favicons/cashnow2go.ico',
    url: 'cashnow2go.ca',
    mail: 'info@cashnow2go.ca',
    companyId: 8,
    appHubId: '8',
    flinks: 'cashnowtogo'
  },
  {
    image: '/images/logo_pretsrapides_dark.png',
    name: 'Prêts rapides',
    slug: 'pretsrapides',
    token: brandToken.pretsrapides,
    style: 'pretsrapides',
    favicon: '/favicons/pretsrapides.ico',
    url: 'pretsrapides.com',
    mail: 'info@pretsrapides.com',
    companyId: 12,
    appHubId: '12',
    flinks: 'pretsrapides'
  },
  {
    image: '/images/logo_depositmycashnow.png',
    name: 'Deposit My Cash Now',
    slug: 'depositmycashnow',
    token: brandToken.dmcn,
    style: 'depositmycashnow',
    favicon: '/favicons/depositmycashnow.ico',
    url: 'depositmycashnow.ca',
    mail: 'info@depositmycashnow.ca',
    companyId: 14,
    appHubId: '14',
    flinks: 'depositmycashnow'
  },
  {
    image: '/images/logo_sendmecashnow.png',
    name: 'Send me cash now',
    slug: 'sendmecashnow',
    token: brandToken.smcn,
    style: 'ineedmymoneytoday',
    favicon: '/favicons/sendmecashnow.ico',
    url: 'sendmecashnow.ca',
    mail: 'info@sendmecashnow.ca',
    companyId: 9,
    appHubId: '15',
    flinks: 'sendmecashnow'
  },
  {
    image: '/images/logo_emailmoneynow.png',
    name: 'Emailmoneynow',
    slug: 'emailmoneynow',
    token: brandToken.emn,
    style: 'cashdepot',
    favicon: '/favicons/emailmoneynow.ico',
    url: 'emailmoneynow.ca',
    mail: 'info@emailmoneynow.ca',
    companyId: 11,
    appHubId: '11',
    flinks: 'emailmoneynow'
  },
  {
    image: '/images/logo_ineedmymoneytoday.png',
    name: 'I Need My Money Today',
    slug: 'ineedmymoneytoday',
    token: brandToken.inmt,
    style: 'ineedmymoneytoday',
    favicon: '/favicons/ineedmymoneytoday.ico',
    url: 'ineedmymoneytoday.ca',
    mail: 'info@ineedmymoneytoday.ca',
    companyId: 10,
    appHubId: '10',
    flinks: 'ineedmymoneytoday'
  },
  {
    image: '/images/logo_givemecashtogo.png',
    name: 'Give me cash to go',
    slug: 'givemecashtogo',
    token: brandToken.gctg,
    style: 'ineedmymoneytoday',
    favicon: '/favicons/givemecashtogo.ico',
    url: 'givemecashtogo.ca',
    mail: 'info@givemecashtogo.ca',
    companyId: 7,
    appHubId: '7',
    flinks: 'givemecashtogo'
  },
  {
    image: '/images/logo_getmypaytoday.png',
    name: 'Get My Pay Today',
    slug: 'getmypaytoday',
    token: brandToken.gmpt,
    style: 'cashdepot',
    favicon: '/favicons/getmypaytoday.ico',
    url: 'getmypaytoday.ca',
    mail: 'info@getmypaytoday.ca',
    companyId: 5,
    appHubId: '5',
    flinks: 'getmypaytoday'
  },
  {
    image: '/images/logo_mynextpays.png',
    name: 'My next pay',
    slug: 'mynextpay',
    token: brandToken.mnp,
    style: 'cashdepot',
    favicon: '/favicons/mynextpay.ico',
    url: 'mynextpay.ca',
    mail: 'info@mynextpay.ca',
    companyId: 4,
    appHubId: '4',
    flinks: 'mynextpay'
  },
  {
    image: '/images/logo_northstarbrokers.png',
    name: 'Northstar Brokers',
    slug: 'northstarbrokers',
    token: brandToken.ns,
    style: 'northstarbrokers',
    favicon: '/favicons/northstarbrokers.ico',
    url: 'northstarbrokers.ca',
    mail: 'info@northstarbrokers.ca',
    companyId: 2,
    appHubId: '2',
    flinks: 'northstarbrokers'
  },
  {
    image: '/images/logo_fintech.png',
    name: 'Fintechfinancial',
    slug: 'fintechfinancial',
    token: brandToken.ns,
    style: 'northstarbrokers',
    favicon: '/favicons/fintech.png',
    url: 'fintechfinancial.ca',
    mail: 'fnfo@Fintechfinancial.ca',
    companyId: 6,
    appHubId: '6',
    flinks: 'fintechfinancial'
  }
]
