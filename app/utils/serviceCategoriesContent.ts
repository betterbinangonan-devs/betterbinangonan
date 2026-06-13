/*
! app\utils\serviceCategoriesContent.ts
? detector: Part of Services Category

connected to: app\utils\serviceDetailsContent.ts
*/

export interface ServiceItem {
  id: string
  title: string
  icon: string
  description: string
  fee: string
  time: string
  link?: string
  hidden?: boolean
}

export interface OfficeCard {
  title: string
  icon: string
  description: string
  link: string
  hidden?: boolean
}

export interface CategoryContent {
  id: string
  name: string
  icon: string
  badgeText: string
  description: string
  services: ServiceItem[]
  offices: OfficeCard[]
  hidden?: boolean
}

export const serviceCategoriesContent: CategoryContent[] = [

  /**
   * ? MARK: Business Permit
   */
  {
    id: 'business',
    name: 'Business, Trade & Investment',
    icon: 'ri-store-2-line',
    badgeText: 'Business',
    description: 'Business permits, licenses, and trade registration services',
    services: [
      {
        id: 'business-permit',
        title: 'Business Permit (New)',
        icon: 'bi-shop',
        description:
          'New business permit application for commercial operations',
        fee: 'Varies',
        time: '1 day',
        link: '/service-details/business-permit-new',
        hidden: false,
      },
      {
        id: 'business-renewal',
        title: 'Business Permit (Renewal)',
        icon: 'bi-arrow-repeat',
        description: 'Annual renewal of existing business permits',
        fee: 'Varies',
        time: 'Approx. 3 hours',
        link: '/service-details/business-permit-renewal',
      },
    ],
    offices: [
    ],
  },

  /**
   * ? MARK: Civil Registry (LCR)
   */
  {
    id: 'civil-registry',
    name: 'Civil Registry',
    icon: 'ri-book-2-line',
    badgeText: 'Civil Registry',
    description: 'Birth, marriage, death registrations, and document corrections',
    hidden: false,
    services: [
      {
        id: 'birth-registration',
        title: 'Birth Registration',
        icon: 'bi-person-vcard',
        description: 'Timely or late registration of a newborn',
        fee: 'Varies',
        time: '26 Minutes',
        link: '/service-details/birth-registration',
        hidden: false,
      },
      {
        id: 'marriage-license',
        title: 'Marriage License',
        icon: 'bi-suit-heart',
        description: 'Required application before getting married',
        fee: '₱427 - ₱757',
        time: '10 Days',
        link: '/service-details/marriage-license',
        hidden: false,
      },

      {
        id: 'death-registration',
        title: 'Death Registration',
        icon: 'bi-file-person',
        description: 'Timely or late registration of death',
        fee: '₱285 - ₱505',
        time: '26 Minutes',
        link: '/service-details/death-registration',
      },
      {
        id: 'late-marriage-registration',
        title: 'Late Marriage Reg.',
        icon: 'bi-clock-history',
        description: 'Register an unregistered marriage',
        fee: '₱500.00',
        time: '26 Mins',
        link: '/service-details/late-marriage-registration',
      },
      {
        id: 'correction-clerical-error',
        title: 'Correct Clerical Error',
        icon: 'bi-eraser',
        description: 'Fix minor typos in your certificates (RA 9048)',
        fee: '₱1,400.00',
        time: '5-6 Months',
        link: '/service-details/correction-clerical-error',
      },
      {
        id: 'correction-sex-dob-name',
        title: 'Change Name / Sex / DOB',
        icon: 'bi-person-gear',
        description: 'Legal change of first name, sex, or DOB',
        fee: '₱6,400.00',
        time: '5-6 Months',
        link: '/service-details/correction-sex-dob-name',
      },
      {
        id: 'legitimation-ausf',
        title: 'Legitimation & AUSF',
        icon: 'bi-people',
        description: 'Legalize child surname use (RA 9255)',
        fee: 'Varies',
        time: '45 Minutes',
        link: '/service-details/legitimation-ausf',
      },
      {
        id: 'supplemental-report',
        title: 'Supplemental Report',
        icon: 'bi-file-plus',
        description: 'Fill in blank or missing document entries',
        fee: '₱460.00',
        time: '40 Minutes',
        link: '/service-details/supplemental-report',
      },
      {
        id: 'certified-true-copy-lcr',
        title: 'Certified True Copy',
        icon: 'bi-printer',
        description: 'Get LGU-certified copies of civil documents',
        fee: '₱105.00/copy',
        time: '26 Minutes',
        link: '/service-details/certified-true-copy-lcr',
      },

    ],
    offices: [
      {
        title: 'Local Civil Registrar (LCR)',
        icon: 'bi-folder-check',
        description: 'Management of all civil registry documents',
        link: '/offices/lcr',
      },
    ],
  },

  /**
   * ? MARK: Property & Assessor
   */
  {
    id: 'assessor',
    name: 'Property & Assessor',
    icon: 'ri-map-2-line',
    badgeText: 'Property & Taxes',
    description: 'Property assessment, tax declarations, and digitized tax maps',
    hidden: false,
    services: [
      {
        id: 'assessment-of-building',
        title: 'Building Assessment',
        icon: 'bi-house-add',
        description: 'Declare newly built or renovated structures',
        fee: '₱300.00 Base',
        time: 'Subject to schedule',
        link: '/service-details/assessment-of-building',
        hidden: false,
      },
      {
        id: 'assessor-certifications',
        title: 'Certifications & Maps',
        icon: 'bi-files',
        description: 'Get Tax Decs, tracebacks, and tax maps',
        fee: '₱50 - ₱400',
        time: 'Same Day',
        link: '/service-details/assessor-certifications',
        hidden: false,
      },
    ],
    offices: [
      {
        title: 'Municipal Assessor\'s Office',
        icon: 'bi-building',
        description: 'Management of real property records and appraisals',
        link: '/offices/assessor',
      },
    ],
  },

  /**
   * ? MARK: Infrastructure
   */
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: 'ri-building-4-line',
    badgeText: 'Infrastructure',
    description:
      'Construction permits, road maintenance requests, and public facilities',
    hidden: false,
    services: [
      {
        id: 'construction-permit-guide',
        title: 'Construction Permit Guide',
        icon: 'bi-journal-text',
        description: 'Step-by-step roadmap for securing infrastructure and construction permits',
        fee: 'Free Guide',
        time: '5 min read',
        link: '/service-details/construction-permit-guide',
        hidden: false,
      },
      {
        id: 'fencing-permit',
        title: 'Fencing Permit',
        icon: 'bi-bounding-box',
        description: 'Permit for fence construction to secure your lot',
        fee: '₱500 Base Fee',
        time: '5 Working Days',
        link: '/service-details/fencing-permit',
        hidden: false,
      },
      {
        id: 'building-permit-new',
        title: 'Building Permit',
        icon: 'bi-building',
        description: 'Permit for construction or renovation of buildings',
        fee: 'Computed per sq.m.',
        time: '15 Working Days',
        link: '/service-details/building-permit-new',
        hidden: false,
      },
      {
        id: 'electrical-permit',
        title: 'Electrical Permit (CEI)',
        icon: 'bi-lightning-charge',
        description: 'For new Meralco connection, reconnection, or upgrades',
        fee: 'Varies by Load',
        time: '2 Working Days',
        link: '/service-details/electrical-permit',
        hidden: false,
      },
      {
        id: 'occupancy-permit',
        title: 'Occupancy Permit',
        icon: 'bi-house-check',
        description: 'Final clearance to legally occupy your new building',
        fee: '₱2,020.00',
        time: '7 Working Days',
        link: '/service-details/occupancy-permit',
        hidden: false,
      },
      {
        id: 'annual-inspection-certificate',
        title: 'Annual Inspection Certificate',
        icon: 'bi-shield-check',
        description: 'Mandatory yearly safety clearance for commercial buildings and businesses',
        fee: '₱980.00',
        time: '25 Minutes',
        link: '/service-details/annual-inspection-certificate',
        hidden: false,
      },
    ],
    offices: [
      {
        title: 'Office of the Building Official (OBO)',
        icon: 'bi-building-gear',
        description: 'Building permits, construction, and infrastructure',
        link: '/offices/obo',
      },
    ],
  },
]

export function getCategoryContent(
  categoryId: string,
): CategoryContent | undefined {
  const category = serviceCategoriesContent.find(category => category.id === categoryId)

  if (!category)
    return undefined

  return {
    ...category,
    services: category.services.filter(service => !service.hidden),
    offices: category.offices.filter(office => !office.hidden),
  }
}
