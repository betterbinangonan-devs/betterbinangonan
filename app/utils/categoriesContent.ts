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

export const categoriesContent: CategoryContent[] = [

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
      {
        id: 'mayors-clearance',
        title: 'Mayor\'s Clearance',
        icon: 'bi-patch-check',
        description:
          'Clearance from the Mayor\'s Office for business operations',
        fee: '₱100',
        time: 'Same day',
        hidden: true,
      },
      {
        id: 'tricycle-franchise',
        title: 'Tricycle Franchise',
        icon: 'bi-bicycle',
        description: 'Application for tricycle-for-hire franchise',
        fee: '₱500',
        time: '3-5 days',
        link: '/service-details/tricycle-franchising',
        hidden: true,
      },
      {
        id: 'sanitary-permit',
        title: 'Sanitary Permit',
        icon: 'bi-heart-pulse',
        description: 'Health and sanitation permit for food establishments',
        fee: '₱200-500',
        time: '1-2 days',
        hidden: true,
      },
      {
        id: 'fire-safety',
        title: 'Fire Safety Certificate',
        icon: 'bi-fire',
        description: 'Fire safety inspection certificate for business premises',
        fee: 'Varies',
        time: '3-5 days',
        hidden: true,
      },
    ],
    offices: [
      {
        title: 'Business Permits & Licensing',
        icon: 'bi-shop-window',
        description:
          'Business permits, Mayor\'s clearance, and licensing services',
        link: '/service-details/business-permit-new',
      },
      {
        title: 'City Treasurer\'s Office',
        icon: 'bi-cash-coin',
        description: 'Business tax payments and fee collection',
        link: '/service-details/city-treasurer',
        hidden: true,
      },
    ],
  },

  /**
   * ? MARK: Social Services
   */
  {
    id: 'social-services',
    name: 'Social Services',
    icon: 'ri-group-line',
    badgeText: 'Social Services',
    description:
      'Welfare programs, senior citizen services, PWD benefits, and financial aid',
    hidden: true,
    services: [
      {
        id: 'senior-id',
        title: 'Senior Citizen ID',
        icon: 'bi-person-vcard',
        description: 'Registration and ID for citizens aged 60 and above',
        fee: 'Free',
        time: '1-2 weeks',
        link: '/service-details/mswdo-services',
      },
      {
        id: 'pwd-id',
        title: 'PWD ID',
        icon: 'bi-universal-access',
        description: 'Registration and ID for persons with disability',
        fee: 'Free',
        time: '1-2 weeks',
        link: '/service-details/mswdo-services',
      },
      {
        id: 'solo-parent',
        title: 'Solo Parent ID',
        icon: 'bi-person-hearts',
        description: 'Registration for solo parent benefits',
        fee: 'Free',
        time: '1-2 weeks',
        link: '/service-details/mswdo-services',
      },
      {
        id: 'financial-aid',
        title: 'Financial Assistance',
        icon: 'bi-wallet2',
        description: 'Emergency financial assistance for indigent families',
        fee: 'Free',
        time: 'Varies',
        link: '/service-details/mswdo-services',
      },
      {
        id: 'burial-assist',
        title: 'Burial Assistance',
        icon: 'bi-flower1',
        description: 'Financial assistance for burial expenses',
        fee: 'Free',
        time: '1-3 days',
        link: '/service-details/mswdo-services',
      },
      {
        id: 'medical-assist',
        title: 'Medical Assistance',
        icon: 'bi-hospital',
        description: 'Assistance for hospitalization and medical expenses',
        fee: 'Free',
        time: '1-3 days',
        link: '/service-details/mswdo-services',
      },
    ],
    offices: [
      {
        title: 'MSWDO',
        icon: 'bi-people',
        description: 'Social welfare programs, IDs, and financial assistance',
        link: '/service-details/mswdo-services',
      },
    ],
  },

  /**
   * ? MARK: Health
   */
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: 'ri-heart-pulse-line',
    badgeText: 'Health',
    description:
      'Vaccination programs, health certificates, and medical assistance',
    hidden: true,
    services: [
      {
        id: 'health-cert',
        title: 'Health Certificate',
        icon: 'bi-file-medical',
        description: 'Medical certificate for employment and food handling',
        fee: '₱50-100',
        time: '1-2 hours',
      },
      {
        id: 'vaccination',
        title: 'Vaccination Services',
        icon: 'bi-droplet',
        description: 'Routine immunization and COVID-19 vaccination',
        fee: 'Free',
        time: '30-60 mins',
      },
      {
        id: 'prenatal',
        title: 'Prenatal Care',
        icon: 'bi-heart',
        description: 'Prenatal checkup and monitoring for pregnant women',
        fee: 'Free',
        time: '30-60 mins',
      },
      {
        id: 'dental',
        title: 'Dental Services',
        icon: 'bi-emoji-smile',
        description: 'Dental checkup, extraction, and treatment',
        fee: '₱50-200',
        time: '30-60 mins',
      },
      {
        id: 'tb-dots',
        title: 'TB-DOTS Program',
        icon: 'bi-lungs',
        description: 'Tuberculosis screening, treatment, and monitoring',
        fee: 'Free',
        time: 'Ongoing',
      },
      {
        id: 'medical-consult',
        title: 'Medical Consultation',
        icon: 'bi-stethoscope',
        description: 'General medical consultation and treatment',
        fee: '₱50-100',
        time: '30-60 mins',
      },
    ],
    offices: [
      {
        title: 'Municipal Health Office',
        icon: 'bi-hospital',
        description: 'Health programs, vaccination, and medical services',
        link: '/services/health',
      },
    ],
  },

  /**
   * ? MARK: Agriculture
   */
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: 'ri-plant-line',
    badgeText: 'Agriculture',
    description:
      'Agricultural loans, crop insurance, fertilizer assistance, and training',
    hidden: true,
    services: [
      {
        id: 'rsbsa',
        title: 'RSBSA Registration',
        icon: 'bi-card-list',
        description: 'Registry System for Basic Sectors in Agriculture',
        fee: 'Free',
        time: '1-2 weeks',
        link: '/service-details/municipal-agriculture',
      },
      {
        id: 'fertilizer',
        title: 'Fertilizer Assistance',
        icon: 'bi-bag',
        description: 'Distribution of subsidized fertilizers to farmers',
        fee: 'Subsidized',
        time: 'Seasonal',
        link: '/service-details/municipal-agriculture',
      },
      {
        id: 'seeds',
        title: 'Seeds Distribution',
        icon: 'bi-flower3',
        description: 'Free or subsidized seeds for registered farmers',
        fee: 'Free/Subsidized',
        time: 'Seasonal',
        link: '/service-details/municipal-agriculture',
      },
      {
        id: 'livestock',
        title: 'Livestock Program',
        icon: 'bi-piggy-bank',
        description: 'Livestock dispersal and veterinary services',
        fee: 'Varies',
        time: 'Ongoing',
        link: '/service-details/municipal-agriculture',
      },
      {
        id: 'agri-training',
        title: 'Agricultural Training',
        icon: 'bi-book',
        description: 'Farming techniques and livelihood training',
        fee: 'Free',
        time: 'Scheduled',
        link: '/service-details/municipal-agriculture',
      },
      {
        id: 'crop-insurance',
        title: 'Crop Insurance',
        icon: 'bi-shield-check',
        description: 'Philippine Crop Insurance Corporation programs',
        fee: 'Subsidized',
        time: '1-2 weeks',
        link: '/service-details/municipal-agriculture',
      },
    ],
    offices: [
      {
        title: 'Municipal Agriculture Office',
        icon: 'bi-tree',
        description: 'Agricultural programs, assistance, and registration',
        link: '/service-details/municipal-agriculture',
      },
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
   * ? MARK: Municipal Assessor
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
      {
        title: 'Municipal Planning & Development',
        icon: 'bi-clipboard-data',
        description: 'Zoning, land use, and development planning',
        link: '/offices/mpdc',
        hidden: true,
      },
    ],
  },

  {
    id: 'education',
    name: 'Education & Scholarship',
    icon: 'bi-mortarboard-fill',
    badgeText: 'Education',
    description:
      'Scholarship programs, student assistance, and educational grants',
    hidden: true,
    services: [
      {
        id: 'scholarship',
        title: 'Municipal Scholarship',
        icon: 'bi-mortarboard',
        description: 'Scholarship program for qualified students',
        fee: 'Free',
        time: 'Semestral',
      },
      {
        id: 'education-assist',
        title: 'Educational Assistance',
        icon: 'bi-cash-stack',
        description: 'One-time financial assistance for students',
        fee: 'Free',
        time: '1-2 weeks',
      },
      {
        id: 'als',
        title: 'ALS Program',
        icon: 'bi-book',
        description: 'Alternative Learning System for out-of-school youth',
        fee: 'Free',
        time: 'Ongoing',
      },
      {
        id: 'daycare',
        title: 'Day Care Services',
        icon: 'bi-emoji-smile',
        description: 'Early childhood care and development program',
        fee: 'Free',
        time: 'School year',
      },
      {
        id: 'tesda',
        title: 'TESDA Programs',
        icon: 'bi-tools',
        description: 'Technical-vocational education and training',
        fee: 'Free/Subsidized',
        time: 'Varies',
      },
      {
        id: 'library',
        title: 'Public Library',
        icon: 'bi-book-half',
        description: 'Access to books and learning resources',
        fee: 'Free',
        time: 'Operating hours',
      },
    ],
    offices: [
      {
        title: 'Mayor\'s Office - Scholarship',
        icon: 'bi-building',
        description: 'Municipal scholarship programs',
        link: '/government',
      },
    ],
  },
  {
    id: 'public-safety',
    name: 'Public Safety',
    icon: 'bi-shield-fill-check',
    badgeText: 'Public Safety',
    description:
      'Emergency services, disaster preparedness, and community safety programs',
    hidden: true,
    services: [
      {
        id: 'disaster-prep',
        title: 'Disaster Preparedness',
        icon: 'bi-exclamation-triangle',
        description: 'Emergency preparedness training and information',
        fee: 'Free',
        time: 'Scheduled',
      },
      {
        id: 'emergency-response',
        title: 'Emergency Response',
        icon: 'bi-telephone',
        description: '24/7 emergency response and rescue services',
        fee: 'Free',
        time: 'Immediate',
      },
      {
        id: 'evacuation',
        title: 'Evacuation Assistance',
        icon: 'bi-signpost',
        description: 'Evacuation support during disasters',
        fee: 'Free',
        time: 'As needed',
      },
      {
        id: 'relief',
        title: 'Relief Operations',
        icon: 'bi-box-seam',
        description: 'Distribution of relief goods during calamities',
        fee: 'Free',
        time: 'As needed',
      },
      {
        id: 'fire-prevention',
        title: 'Fire Prevention',
        icon: 'bi-fire',
        description: 'Fire safety inspection and prevention programs',
        fee: 'Free',
        time: 'Scheduled',
      },
      {
        id: 'peace-order',
        title: 'Peace & Order',
        icon: 'bi-shield',
        description: 'Community safety and crime prevention',
        fee: 'Free',
        time: 'Ongoing',
      },
    ],
    offices: [
      {
        title: 'MDRRMO',
        icon: 'bi-exclamation-triangle',
        description: 'Disaster risk reduction and emergency response',
        link: '/services/public-safety',
      },
    ],
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: 'bi-globe-americas',
    badgeText: 'Environment',
    description:
      'Environmental permits, waste management, and conservation programs',
    hidden: true,
    services: [
      {
        id: 'waste-mgmt',
        title: 'Waste Management',
        icon: 'bi-trash',
        description: 'Garbage collection schedule and proper disposal',
        fee: 'Included in tax',
        time: 'Scheduled',
      },
      {
        id: 'tree-cutting',
        title: 'Tree Cutting Permit',
        icon: 'bi-tree',
        description: 'Permit for tree cutting within municipal area',
        fee: 'Varies',
        time: '5-10 days',
      },
      {
        id: 'env-clearance',
        title: 'Environmental Clearance',
        icon: 'bi-patch-check',
        description: 'Environmental compliance certificate',
        fee: 'Varies',
        time: '5-15 days',
      },
      {
        id: 'clean-air',
        title: 'Clean Air Act Compliance',
        icon: 'bi-wind',
        description: 'Air quality compliance and monitoring',
        fee: 'Varies',
        time: 'Ongoing',
      },
      {
        id: 'coastal',
        title: 'Coastal Resource Management',
        icon: 'bi-water',
        description: 'Protection of coastal and marine resources',
        fee: 'Free',
        time: 'Ongoing',
      },
      {
        id: 'urban-greening',
        title: 'Urban Greening',
        icon: 'bi-flower1',
        description: 'Tree planting and urban greening programs',
        fee: 'Free',
        time: 'Scheduled',
      },
    ],
    offices: [
      {
        title: 'Municipal Environment & Natural Resources',
        icon: 'bi-globe',
        description: 'Environmental programs and permits',
        link: '/services/environment',
      },
    ],
  },
]

export function getCategoryContent(
  categoryId: string,
): CategoryContent | undefined {
  const category = categoriesContent.find(category => category.id === categoryId)

  if (!category)
    return undefined

  return {
    ...category,
    services: category.services.filter(service => !service.hidden),
    offices: category.offices.filter(office => !office.hidden),
  }
}
