/*
! app\utils\serviceDetailsContent.ts
? detector: Part of Services Details

connected to: app\utils\serviceCategoriesContent.ts
*/

export interface QuickStat {
  icon: string
  label: string
  value: string
}

export interface ProcessStep {
  title: string
  description: string
  isFinal?: boolean
}

export interface RequirementGroup {
  title: string
  icon: string
  items: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface OfficeInfo {
  name: string
  location: string
  phone?: string
  email?: string
  hours: string
}

export interface RelatedService {
  title: string
  link: string
}

export interface ServiceDetail {
  id: string
  title: string
  fullTitle: string
  category: string
  categoryLink: string
  badgeText: string
  badgeIcon: string
  description: string
  quickStats: QuickStat[]
  processSteps: ProcessStep[]
  requirements: RequirementGroup[]
  faqs: FAQ[]
  office: OfficeInfo
  relatedServices: RelatedService[]
  onlineLink?: string
  formLink?: string
  applicationMethod?: 'Online' | 'Walk-in' | 'Download Form'
  sourceUrl?: string
  sourceName?: string
  hidden?: boolean
}

export const serviceDetailsContent: ServiceDetail[] = [

  /**
   * ? MARK: Business Permit NEW
   */
  {
    id: 'business-permit-new',
    title: 'Business Permit (New)',
    fullTitle: 'New Business Permit Application',
    category: 'Business',
    categoryLink: '/services/business',
    badgeText: 'Business',
    badgeIcon: 'bi-shop',
    description: 'Start your new business in Binangonan by securing your official Mayor\'s Permit through the Business One-Stop-Shop (BOSS).',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: 'Usually 1-3 Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Base Fee + Capital Tax' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Business Owners or Authorized Reps',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit & Assessment',
        description:
          'Submit your printed application form and documents to the BPLO at the Ground Floor. Inspectors will verify your clearances and compute your exact fees based on your capital.',
      },
      {
        title: 'Pay Fees',
        description:
          'Proceed to the Municipal Treasurer\'s Office. Pay your computed local taxes and regulatory fees, and make sure to secure your Official Receipt.',
      },
      {
        title: 'Claim Permit',
        description:
          'Return to the BPLO releasing area with your receipt to claim your approved Mayor\'s Permit and Business Plate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents',
        icon: 'bi-file-text',
        items: [
          'Printed and fully filled-out Unified Application Form.',
          'Proof of Business Registration: DTI (for sole owners), SEC (for corporations), or CDA (for cooperatives).',
          'Clear photo of your business location showing the storefront and signboard.',
        ],
      },
      {
        title: 'Proof of Location (Bring One)',
        icon: 'bi-geo-alt',
        items: [
          'If you own the space: Land Title or Tax Declaration.',
          'If you rent the space: Notarized Lease Contract or written consent from the property owner.',
        ],
      },
      {
        title: 'If Applying Through a Representative',
        icon: 'bi-person-vcard',
        items: [
          'For Sole Proprietorships: Special Power of Attorney (SPA) and valid IDs of both the owner and representative.',
          'For Corporations/Cooperatives: Board Resolution or Secretary Certificate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much exactly will the new permit cost?',
        answer:
          'The exact fee cannot be predetermined online. It is calculated by the BPLO Assessor based on the starting capital declared in your application form and your specific line of business.',
      },
      {
        question: 'What is a Special Power of Attorney (SPA)?',
        answer:
          'An SPA is a notarized legal document where the business owner gives another person permission to process the permit on their behalf.',
      },
      {
        question: 'Where can I get the Business Application Form?',
        answer: 'You can download and print the form from the Application Method section of this page, or get a physical copy directly from BPLO.',
      },
    ],
    office: {
      name: 'Business Permit and Licensing Office (BPLO)',
      location: '1F, New Municipal Building',
      email: 'bplo@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Business Permit Renewal',
        link: '/service-details/business-permit-renewal',
      },
    ],
    onlineLink: '',
    formLink: 'https://binangonan.gov.ph/wp-content/uploads/2026/01/Application-Form-for-Business-Permit.pdf',
    applicationMethod: 'Download Form',
    sourceUrl: 'https://www.facebook.com/share/p/1H96htkkdy/',
    sourceName: 'Official LGU Business Permit Requirements',
  },

  /**
   * ? MARK: Business Permit RENEW
   */
  {
    id: 'business-permit-renewal',
    title: 'Business Permit (Renewal)',
    fullTitle: 'Business Permit Renewal',
    category: 'Business',
    categoryLink: '/services/business',
    badgeText: 'Business',
    badgeIcon: 'bi-shop',
    description: 'Keep your business compliant and operating smoothly by renewing your official Mayor\'s Permit through the Business One-Stop-Shop (BOSS).',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '42 Minutes (ARTA Standard)' },
      { icon: 'bi-cash', label: 'Fee', value: 'Based on Gross Sales' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Registered Owners or Authorized Reps',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit & Assessment',
        description:
          'Submit your printed renewal form and financial documents to the BPLO. They will assess your local business tax based on your declared gross sales from the previous year.',
      },
      {
        title: 'Pay Taxes',
        description:
          'Proceed to the Municipal Treasurer\'s Office. Pay your computed local taxes and regulatory fees, and ensure you receive your Official Receipt.',
      },
      {
        title: 'Claim Renewed Permit',
        description:
          'Return to the BPLO releasing area with your receipt to claim your updated Mayor\'s Permit and clearances for the current year.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents',
        icon: 'bi-file-text',
        items: [
          'Printed and fully filled-out Unified Application Form (Tick the "Renewal" box).',
          'Your Mayor\'s Permit from the previous year, or your previous Tax Order of Payment.',
          'Valid Fire Safety Inspection Certificate (Must be valid for 1 year).',
          'Certificate of Tax Exemption from local taxes or fees (Only if your business is legally exempt).',
        ],
      },
      {
        title: 'Proof of Income',
        icon: 'bi-graph-up',
        items: [
          'For BIR-registered businesses: Financial Statements, ITR, or Sales Returns (2550Q/2551Q) showing your annual gross receipts.',
          'For non-BIR registered businesses: A Notarized Sworn Declaration of your gross sales/receipts.',
        ],
      },
      {
        title: 'If Applying Through a Representative',
        icon: 'bi-person-vcard',
        items: [
          'For Sole Proprietorships: Special Power of Attorney (SPA) and valid IDs of both the owner and representative.',
          'For Corporations/Cooperatives: Board Resolution or Secretary Certificate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is the renewal fee computed?',
        answer:
          'Unlike new businesses which are taxed on their starting capital, renewals are taxed based on your declared annual gross receipts from the previous year. Bring your financial statements so the BPLO Assessor can compute the exact amount.',
      },
      {
        question: 'Do I really need a new Fire Safety Inspection Certificate?',
        answer:
          'Yes. Fire Safety certificates are only valid for one year. You must secure a new, valid certificate from the Bureau of Fire Protection to renew your business permit.',
      },
      {
        question: 'Where can I get the Business Application Form?',
        answer: 'You can download and print the form from the Application Method section of this page, or get a physical copy directly from BPLO.',
      },
    ],
    office: {
      name: 'Business Permit and Licensing Office (BPLO)',
      location: '1F, New Municipal Building',
      email: 'bplo@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Business Permit Application (New)',
        link: '/service-details/business-permit-new',
      },
    ],
    onlineLink: '',
    formLink: 'https://binangonan.gov.ph/wp-content/uploads/2026/01/Application-Form-for-Business-Permit.pdf',
    applicationMethod: 'Download Form',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: BLDG: Construction Permit Guide
   */
  {
    id: 'construction-permit-guide',
    title: 'Construction Permit Guide',
    fullTitle: 'Comprehensive Guide to Securing Construction Permits',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Step-by-Step Guide',
    badgeIcon: 'bi-journal-text',
    description: 'Planning to build a new structure or start a business? If you have zero experience with construction permits, follow this chronological roadmap to avoid penalties and delays.',
    quickStats: [
      { icon: 'bi-info-circle', label: 'Type', value: 'Informational Guide' },
      { icon: 'bi-list-check', label: 'Total Steps', value: '4 Major Phases' },
      {
        icon: 'bi-person-check',
        label: 'Best For',
        value: 'First-time Property Owners',
      },
      { icon: 'bi-building', label: 'Department', value: 'Office of the Building Official' },
    ],
    processSteps: [
      {
        title: 'Phase 1: Secure Your Lot (Optional)',
        description: 'Are you planning to build a perimeter wall to secure your construction materials? If you are building a fence higher than 1 meter, you must apply for a Fencing Permit first. If you are not building a fence, you can skip this step.',
      },
      {
        title: 'Phase 2: The "Mother" Permit (Building Permit)',
        description: 'This is the most important step. You cannot legally start building the actual house without a Building Permit. You will submit your architectural and engineering plans to the Municipal Hall during this phase.',
      },
      {
        title: 'Phase 3: The Construction Phase',
        description: 'Once you have your Building Permit, your contractor can start building! Keep your permit tarpaulin visible on your gate and maintain a daily logbook on-site.',
      },
      {
        title: 'Phase 4: Move-In & Utilities (Occupancy & CEI)',
        description: 'Is the house finished? You cannot legally move in or get a Meralco connection yet. You must apply for an Occupancy Permit and a Certificate of Final Electrical Inspection (CEI) to prove the house is completely safe to live in.',
      },
      {
        title: 'Phase 5: Yearly Maintenance (For Businesses)',
        description: 'If you built a commercial building or business establishment, your journey does not end at Move-In. You are required to secure an Annual Inspection Certificate every year before renewing your Mayor\'s Business Permit.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'What documents do I need?',
        icon: 'bi-ui-checks',
        items: [
          'Because each phase requires different documents, we have separated the checklists.',
          'Scroll down to the "Related Services" section below and click on the specific permit you need to process right now to see the exact requirements, processing times, and fees.',
        ],
      },
    ],
    faqs: [
      {
        question: 'I really do not know where to start. Who can help me?',
        answer: 'Do not worry! If you hire a licensed Architect or Civil Engineer to design your house, they usually process all of these permits for you. Read this guide so you understand exactly what they are doing on your behalf.',
      },
      {
        question: 'Do I really need to do all of this?',
        answer: 'Yes. Building without permits is illegal. The Office of the Building Official can issue a Work Stoppage Order, force you to demolish unauthorized structures, or charge you up to 100% surcharge on your permit fees.',
      },
    ],
    office: {
      name: 'Office of the Municipal Engineer',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
    ],
    onlineLink: '',
    formLink: '',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: BLDG: Building Permit
   */
  {
    id: 'building-permit-new',
    title: 'Building Permit',
    fullTitle: 'Application for New Building Permit',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-building',
    description: 'Secure your official Building Permit from the Office of the Building Official before starting any construction, renovation, or demolition project.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '15 Working Days (Complex)' },
      { icon: 'bi-cash', label: 'Fee', value: 'Computed per sq.m. (National Building Code)' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Representatives',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit & Routing',
        description: 'Submit your complete plans and legal documents to the Office of the Building Official. Your application will be reviewed by the municipal engineering team (Architectural, Structural, Electrical, and Plumbing) for technical approval.',
      },
      {
        title: 'Assessment & Clearances',
        description: 'Once technically approved, you will receive an Order of Payment. You will also need to submit your documents to the Bureau of Fire Protection to get your Fire Safety Evaluation Clearance.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay your computed Building Permit fees at the Municipal Treasurer\'s Office and secure your Official Receipt.',
      },
      {
        title: 'Claim Permit',
        description: 'Return to the Office of the Building Official with your Official Receipt and Fire Safety Clearance to claim your signed Building Permit and stamped plans.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Legal Documents',
        icon: 'bi-file-earmark-person',
        items: [
          'Certified True Copy of your Transfer Certificate of Title from the Registry of Deeds.',
          'Tax Declaration and your latest Real Property Tax (Amilyar) Receipt.',
          'If you are not the registered owner: A Notarized Contract of Lease, Deed of Absolute Sale, or a written Consent to Construct from the lot owner.',
        ],
      },
      {
        title: 'Technical Documents (Signed & Sealed)',
        icon: 'bi-compass',
        items: [
          'Five (5) sets of complete Building Plans (Architectural, Structural, Sanitary/Plumbing, Electrical, Mechanical).',
          'Three (3) sets of Bill of Materials and Cost Estimates.',
          'Three (3) sets of General Specifications.',
          'For 2-story buildings and above: Structural Analysis and Design.',
        ],
      },
      {
        title: 'Clearances',
        icon: 'bi-check-circle',
        items: [
          'Barangay Clearance specifically issued for a Construction or Building Permit.',
          'Locational or Zoning Clearance from the Municipal Planning and Development Office.',
          'Fire Safety Evaluation Clearance from the Bureau of Fire Protection.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need a building permit for minor repairs?',
        answer: 'Minor repairs that do not affect the structural integrity, electrical, or plumbing systems usually fall under exemptions, but it is always best to consult with the Office of the Building Official first to avoid penalties.',
      },
      {
        question: 'Who should sign and seal my plans?',
        answer: 'Your plans must be signed and sealed by licensed professionals: an Architect or Civil Engineer for building plans, a Professional Electrical Engineer for electrical plans, and a Master Plumber for sanitary plans.',
      },
      {
        question: 'How much are the building permit fees?',
        answer: 'Fees are calculated based on the National Building Code of the Philippines. The exact amount depends on your total floor area, the type of building (like residential or commercial), and the total estimated cost of your project.',
      },
    ],
    office: {
      name: 'Office of the Building Official',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Comprehensive Guide to Securing Construction Permits',
        link: '/service-details/construction-permit-guide',
      },
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Building Permit Requirements',
  },

  /**
   * ? MARK: BLDG: Fencing Permit
   */
  {
    id: 'fencing-permit',
    title: 'Fencing Permit',
    fullTitle: 'Application for Fencing Permit',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-bounding-box',
    description: 'Secure your property perimeter legally by getting a Fencing Permit before constructing walls or fences around your lot.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '5 Working Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱500.00 Base Fee' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Representatives',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Documents',
        description: 'Submit your complete application forms and plans to the Receiving Section. The Engineering Office will schedule a site inspection.',
      },
      {
        title: 'Assessment',
        description: 'Once your application passes the site inspection and technical review, you will receive an Order of Payment.',
      },
      {
        title: 'Pay Fees',
        description: 'Proceed to the Municipal Treasurer\'s Office and pay the ₱500.00 permit fee to secure your Official Receipt.',
      },
      {
        title: 'Claim Permit',
        description: 'Return to the Engineering Office with your receipt to claim your approved Fencing Permit and construction tarpaulin.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Legal Documents',
        icon: 'bi-file-earmark-person',
        items: [
          'Proof of ownership (Transfer Certificate of Title, Deed of Sale, etc.).',
          'Latest Real Property Tax Declaration.',
          'Real Property Tax Certification/Clearance (Amilyar) from the Land Tax Office.',
          'Barangay Clearance specifically for fencing purposes.',
        ],
      },
      {
        title: 'Technical Documents',
        icon: 'bi-compass',
        items: [
          'Duly accomplished application forms (Signed and sealed by licensed professionals).',
          'Lot Plan (Must indicate the length of the fence and the location/width of the gates).',
          'Building Plans (Required only if the fence is higher than 1.00 meter).',
        ],
      },
      {
        title: 'Special Clearances',
        icon: 'bi-exclamation-triangle',
        items: [
          'Written consent from affected neighbors (Required ONLY if the fence height exceeds 1.80 meters).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need my neighbor\'s signature?',
        answer: 'You only need a written consent from your adjacent neighbors if your planned fence is taller than 1.80 meters (around 6 feet). If it is lower, standard documents will suffice.',
      },
      {
        question: 'Do I need building plans for a simple fence?',
        answer: 'If your fence is less than 1.00 meter high, you do not need formal building plans. However, if it exceeds 1.00 meter, signed and sealed plans are required for structural safety.',
      },
    ],
    office: {
      name: 'Office of the Municipal Engineer',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Comprehensive Guide to Securing Construction Permits',
        link: '/service-details/construction-permit-guide',
      },
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: BLDG: Electrical Permit (CEI)
   */
  {
    id: 'electrical-permit',
    title: 'Electrical Permit & CEI',
    fullTitle: 'Certificate of Final Electrical Inspection',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-lightning-charge',
    description: 'Required by Meralco for new electrical connections, line reconnections, or load upgrading of existing installations.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '2 Working Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Varies by KVA Load' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Representatives',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit & Inspection',
        description: 'Submit your electrical plans and forms. The Engineering team will visit your property to inspect the safety of your electrical installation.',
      },
      {
        title: 'Assessment',
        description: 'Once your installation passes the physical inspection, you will be issued an Order of Payment.',
      },
      {
        title: 'Pay Fees',
        description: 'Proceed to the Municipal Treasurer\'s Office and pay the computed fees to secure your Official Receipt.',
      },
      {
        title: 'Claim CEI',
        description: 'Present your receipt to the Engineering Office to claim your official Certificate of Final Electrical Inspection (CEI). You can now submit this to Meralco.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents (For All Applicants)',
        icon: 'bi-file-earmark-text',
        items: [
          'Completely filled out and signed Electrical Permit Form.',
          'Proof of ownership (Deed of Sale, Land Title, etc.).',
          'Latest Tax Payment Receipt (Amilyar).',
        ],
      },
      {
        title: 'For New Connections',
        icon: 'bi-plug',
        items: [
          'Floor Plan (1 Original, 1 Photocopy).',
          'Electrical Plan signed and sealed by a Professional Electrical Engineer (1 Original, 1 Photocopy).',
        ],
      },
      {
        title: 'For Reconnections & Upgrades',
        icon: 'bi-arrow-repeat',
        items: [
          'Photocopy of your old Meralco Bill.',
          'For Upgrades: Schedule of Load signed by an Electrical Engineer.',
          'For Reconnections: Previous Certificate of Electrical Inspection.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need this if I am just changing a breaker?',
        answer: 'Minor repairs usually do not require a permit, but if you are requesting a line reconnection from Meralco or upgrading your total electrical load, you must secure a new CEI.',
      },
      {
        question: 'How is the fee computed?',
        answer: 'The fee is based on the National Building Code (PD 1096) and is computed by the engineers depending on your Total Connected Load (in kVA).',
      },
    ],
    office: {
      name: 'Office of the Municipal Engineer',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Comprehensive Guide to Securing Construction Permits',
        link: '/service-details/construction-permit-guide',
      },
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: BLDG: Occupancy Permit
   */
  {
    id: 'occupancy-permit',
    title: 'Occupancy Permit',
    fullTitle: 'Application for Certificate of Occupancy',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-house-check',
    description: 'The final clearance required before you can legally move in, use, or operate a business in your newly constructed building or house.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '7 Working Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱2,020.00' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Representatives',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Documents',
        description: 'Submit your Certificate of Completion and as-built plans to the Engineering Office. The Building Official will then endorse your application to the Bureau of Fire Protection (BFP) for a Fire Safety Inspection.',
      },
      {
        title: 'Final Site Inspection',
        description: 'The municipal engineering team will conduct a final inspection of your building to verify if it was constructed exactly according to your approved Building Permit plans.',
      },
      {
        title: 'Pay Fees',
        description: 'Once approved, proceed to the Municipal Treasurer\'s Office and pay the ₱2,020.00 Occupancy Permit fee.',
      },
      {
        title: 'Claim Permit',
        description: 'Return to the Engineering Office with your Official Receipt to claim your signed Certificate of Occupancy. You are now cleared to move in!',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Legal Documents',
        icon: 'bi-file-earmark-person',
        items: [
          'Duly Notarized Certificate of Completion (1 Original).',
          'Photocopy of your previously approved Building Permit.',
        ],
      },
      {
        title: 'Technical Documents',
        icon: 'bi-compass',
        items: [
          'Construction Logbook from your contractor (1 Photocopy).',
          'As-built plans and specifications (1 Original, 1 Photocopy).',
          'Building Inspections Sheet (1 Photocopy).',
        ],
      },
    ],
    faqs: [
      {
        question: 'What are "As-built plans"?',
        answer: 'During construction, there are usually minor changes from the original blueprint. "As-built plans" are the final, updated drawings showing exactly how the building was actually constructed.',
      },
      {
        question: 'Can I get a Business Permit without this?',
        answer: 'No. The Business Permits and Licensing Office (BPLO) strictly requires a Certificate of Occupancy before issuing a new Mayor\'s Permit for any commercial establishment.',
      },
    ],
    office: {
      name: 'Office of the Municipal Engineer',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Comprehensive Guide to Securing Construction Permits',
        link: '/service-details/construction-permit-guide',
      },
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
      {
        title: 'Starting a business? Apply for a Business Permit',
        link: '/service-details/business-permit-new',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: BLDG: Annual Inspection Certificate
   */
  {
    id: 'annual-inspection-certificate',
    title: 'Annual Inspection Certificate',
    fullTitle: 'Annual Building Inspection Certificate (For Businesses)',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Business Compliance',
    badgeIcon: 'bi-shield-check',
    description: 'A mandatory yearly clearance for commercial buildings and businesses to ensure structural, electrical, and mechanical safety. (Note: This is NOT required for standard residential houses).',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '25 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: '₱980.00' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Building Administrators or Owners',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit & Evaluation',
        description: 'Submit your request letter and clearances to the Engineering Office. The team will conduct a safety inspection and evaluate the report.',
      },
      {
        title: 'Order of Payment',
        description: 'Once the evaluation and inspection are clear, the administrative staff will issue an Order of Payment.',
      },
      {
        title: 'Pay Fees',
        description: 'Proceed to the Municipal Treasurer\'s Office and pay the ₱980.00 Annual Inspection Fee.',
      },
      {
        title: 'Claim Certificate',
        description: 'Return to the Engineering Office and present your Official Receipt to claim your Annual Inspection Certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents',
        icon: 'bi-file-earmark-text',
        items: [
          'Request Letter (1 Original).',
          'Photocopy of Building Permit and Occupancy Permit.',
          'Latest Fire Safety Inspection Certificate (FSIC).',
        ],
      },
      {
        title: 'Structural & Electrical Clearances',
        icon: 'bi-lightning',
        items: [
          'Certificate of Structural Stability (Required only if the building is 15 years old and older).',
          'Preventive Maintenance Report and Insulation Resistance Test.',
          'Latest Certificate of Electrical Inspection (CEI).',
        ],
      },
      {
        title: 'Mechanical Clearances (If Applicable)',
        icon: 'bi-gear',
        items: [
          'Previous Mechanical Permit.',
          'Certification & Test Results for heavy equipment like Elevators, Escalators, Boilers, etc.',
          'Records of Safety Activities / Monthly Meetings of Safety & Health Committee.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need this for my residential house?',
        answer: 'No. Standard single detached dwelling units and duplexes are not subject to mandatory annual inspections. This is strictly required for commercial, industrial, and institutional buildings.',
      },
      {
        question: 'Why do I need this certificate?',
        answer: 'This certificate proves that your commercial building remains structurally sound and safe from fire and electrical hazards. It is a strict prerequisite when renewing your Mayor\'s Business Permit at the BPLO.',
      },
    ],
    office: {
      name: 'Office of the Municipal Engineer',
      location: 'Municipal Hall',
      email: 'engineering@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Comprehensive Guide to Securing Construction Permits',
        link: '/service-details/construction-permit-guide',
      },
      {
        title: 'Step 1: Get a Fencing Permit (optional)',
        link: '/service-details/fencing-permit',
      },
      {
        title: 'Step 2: Get a Building Permit',
        link: '/service-details/building-permit-new',
      },
      {
        title: 'Step 3: Get an Electrical Permit (CEI)',
        link: '/service-details/electrical-permit',
      },
      {
        title: 'Step 4: Get an Occupancy Permit',
        link: '/service-details/occupancy-permit',
      },
      {
        title: 'Step 5: Annual Inspection (Businesses Only)',
        link: '/service-details/annual-inspection-certificate',
      },
      {
        title: 'Renewing your business? Proceed to Business Permit Renewal',
        link: '/service-details/business-permit-renewal',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Citizens Charter',
  },

  /**
   * ? MARK: Birth Certificate Registration
   */
  {
    id: 'birth-registration',
    title: 'Birth Certificate Registration',
    fullTitle: 'Registration of Birth Certificates',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-person-vcard',
    description: 'Officially register the birth of a child to secure their legal identity. This applies to both timely registrations (newborns) and late registrations.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '26 Mins (+10 Days posting if Late Reg)' },
      { icon: 'bi-cash', label: 'Fee', value: 'Up to ₱920.00 depending on penalties' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Parents, Guardians, or General Public',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Forms',
        description: 'Present the duly accomplished birth certificate form and complete requirements to the LCR Office for review.',
      },
      {
        title: 'Pay Fees',
        description: 'Once checked, you will be issued an Order of Payment. Proceed to the Municipal Treasurer\'s Office (Window 2 or 3) to pay the corresponding fees.',
      },
      {
        title: 'Registration & Signature',
        description: 'Present your Official Receipt back to the LCR Office. The staff will register the certificate and it will be signed by the Municipal Civil Registrar.',
      },
      {
        title: 'Claim Birth Certificate',
        description: 'Receive your officially registered Birth Certificate. (Note: Late registrations have a mandatory 10-day waiting period before release).',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Standard Requirements (Timely & Late)',
        icon: 'bi-file-earmark-text',
        items: [
          'Duly accomplished birth certificate form (4 original copies).',
          'National ID or EPhil ID. (Required for 1 year old and above. If none, register first with PhilSys).',
          '2x2 Picture with white background.',
          'Two (2) documents each from the father and mother proving identity (e.g., PhilHealth MDR, Gov\'t ID, Voter\'s Record, Marriage Contract, etc.).',
          'Barangay Certification or Proof of Residency (1 original copy).',
        ],
      },
      {
        title: 'Additional for Late Registration',
        icon: 'bi-clock-history',
        items: [
          'New PSA Negative Certification of Birth (Required for 7 months old and above).',
          'One (1) document showing date and place of birth (Immunization Record, Baptismal, Marriage Certificate, PhilHealth MDR, SSS Record, NBI/Police Clearance, or Passport).',
        ],
      },
      {
        title: 'For Unmarried Parents',
        icon: 'bi-pen',
        items: [
          'AUSF (Affidavit to Use the Surname of the Father) if the child will carry the father\'s last name.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Who needs to physically go to the LCR?',
        answer: 'For minors, a parent must be present. For individuals 18 years old and above, the registrant must appear personally at the office.',
      },
      {
        question: 'Is there a waiting period for late registration?',
        answer: 'Yes. By law, late registrations are subject to a mandatory 10-day posting period on the municipal bulletin board before the Birth Certificate can be officially released.',
      },
      {
        question: 'Who should sign the AUSF if the parents are not married?',
        answer: 'If the child is 0-6 years old, the mother signs it. If the child is 7-17 years old, the child signs it, attested by the mother. If the child is 18 and above, they sign it themselves.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Marriage License Application
   */
  {
    id: 'marriage-license',
    title: 'Marriage License',
    fullTitle: 'Application for Marriage License',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-suit-heart',
    description: 'Before you can legally get married, couples must apply for a Marriage License. This license requires a 10-day mandatory posting period before it is released.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '26 Mins (Released after 10 days)' },
      { icon: 'bi-cash', label: 'Fee', value: 'Civil: ₱757 | Church: ₱427' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Couples planning to get married',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Application',
        description: 'Present the duly accomplished marriage license form and all requirements to the LCR staff for checking.',
      },
      {
        title: 'Pay Fees',
        description: 'Proceed to the Municipal Treasurer\'s Office to pay the applicable fees (License Fee, Family Planning Fee, Posting Fee, etc.).',
      },
      {
        title: 'Process & Posting',
        description: 'Return your Official Receipt to the LCR. Your application will be processed and will undergo the mandatory 10-day posting period.',
      },
      {
        title: 'Claim License',
        description: 'Return to the LCR on the given release date (after 10 days) to claim your signed Marriage License.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Requirements (Both Parties)',
        icon: 'bi-file-earmark-person',
        items: [
          'Birth Certificate (1 original copy).',
          'Certificate of No Marriage (CENOMAR) from PSA (1 original copy).',
          'Residence Certificate or Cedula (1 original copy).',
          'Certificate of Family Planning / FP Seminar (Every Thursday & Friday 12:30pm at the Population Office).',
        ],
      },
      {
        title: 'Additional Requirements (If Applicable)',
        icon: 'bi-exclamation-circle',
        items: [
          'If below 25 years old: Personal Appearance of Parents is required.',
          'If having a church wedding: Certificate of Marriage Counseling from the church.',
          'If foreigner: Certificate of Legal Capacity to Marry from the embassy.',
          'If widow/widower: Death Certificate of the Deceased Spouse.',
          'If annulled: Certification of Judicial Decree of Annulment from the Trial Court.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When should we attend the Family Planning Seminar?',
        answer: 'The Population Office conducts the seminar every Thursday and Friday at 12:30 PM at the New Municipal Hall.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Death Certificate Registration
   */
  {
    id: 'death-registration',
    title: 'Death Certificate Registration',
    fullTitle: 'Registration of Death Certificates (Timely & Late)',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-file-person',
    description: 'Officially register the passing of a loved one to secure their legal death certificate, which is required for burial, insurance claims, and estate settlement.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '26 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: 'Timely: ₱285 | Late: ₱505' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Immediate Family or Authorized Representatives',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Forms',
        description: 'Present the duly accomplished death certificate form and complete requirements to the LCR Office.',
      },
      {
        title: 'Pay Fees',
        description: 'Proceed to the Municipal Treasurer\'s Office (Window 2 or 3) and pay the timely or late registration fee.',
      },
      {
        title: 'Registration',
        description: 'Return to the LCR with your Official Receipt for the signing and registration of the Death Certificate.',
      },
      {
        title: 'Claim Document',
        description: 'Receive your officially registered Death Certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Standard Requirements',
        icon: 'bi-file-earmark-text',
        items: [
          'Duly accomplished death certificate form (4 original copies).',
          'Certification of Death from the Municipal Health Office or Hospital (1 original copy).',
          'Barangay Certification (1 original copy).',
        ],
      },
      {
        title: 'For Late Registration',
        icon: 'bi-clock-history',
        items: [
          'PSA Negative Certification of Death (1 original copy).',
          'Joint Affidavit of 2 Disinterested Parties (1 original copy).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a penalty for late registration?',
        answer: 'Yes, if you register the death beyond the standard allowable period, the fee increases from ₱285 to ₱505.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Late Registration of Marriage
   */
  {
    id: 'late-marriage-registration',
    title: 'Late Marriage Registration',
    fullTitle: 'Late Registration of Marriage Certificate',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-clock-history',
    description: 'For couples whose marriage was not officially registered by their solemnizing officer on time. Register your marriage to legalize your union in the government system.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '26 Minutes (+ Posting Period)' },
      { icon: 'bi-cash', label: 'Fee', value: '₱500.00 Total' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Married Couples',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Requirements',
        description: 'Submit your compiled documents and the unregistered Certificate of Marriage to the LCR.',
      },
      {
        title: 'Payment',
        description: 'Pay the total fee of ₱500.00 (Late Reg Fee, Processing Fee, and Certification Fee) at the Treasurer\'s Office.',
      },
      {
        title: 'Claim Registration',
        description: 'Return your receipt to the LCR to officially register the marriage and claim your copies.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents (For Both Parties)',
        icon: 'bi-folder-check',
        items: [
          'Certificate of Marriage issued by the solemnizing officer.',
          'Baptismal Certificate (both parties).',
          'Birth Certificate (both parties).',
          'CENOMAR or Certificate of No Marriage (both parties).',
          'Barangay Certification of Residency (both parties).',
          'Valid IDs of both parties.',
        ],
      },
      {
        title: 'Church & Legal Documents',
        icon: 'bi-building',
        items: [
          'Certificate of Publication of Marriage Banns (from the church).',
          'PSA Negative Certification for Marriage.',
          'Certificate of Finality from solemnizing officer (if applicable).',
        ],
      },
    ],
    faqs: [],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Correction of Clerical Error (RA 9048)
   */
  {
    id: 'correction-clerical-error',
    title: 'Correction of Clerical Error',
    fullTitle: 'Correction of Clerical Errors under RA 9048',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Document Correction',
    badgeIcon: 'bi-eraser',
    description: 'Fix minor spelling mistakes, typos, or clerical errors in your Birth, Marriage, or Death Certificate without going to court.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '5 to 6 Months' },
      { icon: 'bi-cash', label: 'Fee', value: '₱1,400.00 Total' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Document Owner or Authorized Kin',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Filing & Evaluation',
        description: 'Submit your erroneous PSA certificate and all supporting documents proving the correct spelling to the LCR.',
      },
      {
        title: 'Payment',
        description: 'Pay the Filing Fee (₱1,000), Processing Fee (₱200), Posting Fee (₱50), and Certificate of Finality (₱150) at the Treasurer\'s Office.',
      },
      {
        title: 'Processing Period',
        description: 'Wait for 5 to 6 months. Your request will be forwarded to the PSA Head Office for approval and system updating.',
      },
      {
        title: 'Claim Finality',
        description: 'Once approved, claim your Certificate of Finality from the LCR, confirming the correction is successful.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Primary Documents',
        icon: 'bi-file-text',
        items: [
          'PSA Birth, Marriage, or Death Certificate with error.',
          'Birth Certificate, Baptismal Certificate, and Marriage Certificate.',
          'Voter\'s Registration Record (COMELEC).',
          'School Record (Transcript or Diploma).',
          'SSS / GSIS Record and Valid IDs.',
        ],
      },
      {
        title: 'Supporting Documents (To prove correct spelling)',
        icon: 'bi-diagram-3',
        items: [
          'Birth Certificate of your children, brothers, or sisters.',
          'Marriage Certificate of your parents.',
          'Birth, Baptismal, or Death Certificate of your parents.',
          'Valid IDs of Mother and Father.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does it take 5 to 6 months?',
        answer: 'The LGU only processes the petition. The actual approval and updating of the national database are done by the Philippine Statistics Authority (PSA) head office, which takes time.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Change of Name / Sex / DOB (RA 10172)
   */
  {
    id: 'correction-sex-dob-name',
    title: 'Change of Name / Sex / DOB',
    fullTitle: 'Change of First Name, Sex, or Date of Birth (RA 9048 & RA 10172)',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Document Correction',
    badgeIcon: 'bi-person-gear',
    description: 'Legally change your first name, or correct the registered sex (gender) and date of birth in your civil registry documents. This requires newspaper publication.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '5 to 6 Months' },
      { icon: 'bi-cash', label: 'Fee', value: '₱6,400.00 Total' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Document Owner',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Filing & Evaluation',
        description: 'Submit your erroneous PSA certificate and all heavy supporting documents (including medical records if changing Sex/DOB) to the LCR.',
      },
      {
        title: 'Payment & Publication',
        description: 'Pay the total fee of ₱6,400. This includes the heavy ₱3,000 Filing Fee and the ₱3,000 mandatory Newspaper Publication fee required by law.',
      },
      {
        title: 'Processing Period',
        description: 'Wait for 5 to 6 months while the PSA Head Office reviews your petition and updates the national database.',
      },
      {
        title: 'Claim Finality',
        description: 'Claim your Certificate of Finality from the LCR once the correction is approved nationwide.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Identity Documents',
        icon: 'bi-person-badge',
        items: [
          'PSA Birth Certificate with error.',
          'Baptismal Certificate and Earliest School Record (Elementary Form 137).',
          'Voter\'s Registration Record (COMELEC).',
          'School Record (Transcript, Diploma).',
          'Valid IDs or Cedula (if no valid IDs).',
        ],
      },
      {
        title: 'Clearances & Employment',
        icon: 'bi-shield-check',
        items: [
          'Police Clearance and NBI Clearance.',
          'Certificate of Employment (if employed) OR Affidavit of Non-Employment (if not employed).',
          'SSS / GSIS Record.',
        ],
      },
      {
        title: 'For Correction of Sex & Date of Birth Only',
        icon: 'bi-hospital',
        items: [
          'Medical Records.',
          'Medical Certificate issued strictly by a Government Physician of Binangonan.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is it so expensive?',
        answer: 'By law, changing your first name, sex, or date of birth requires a mandatory publication in a newspaper of general circulation to ensure you are not hiding from criminal liability. Half of the cost (₱3,000) goes directly to the publication fee.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Legitimation & AUSF (RA 9255)
   */
  {
    id: 'legitimation-ausf',
    title: 'Legitimation & AUSF',
    fullTitle: 'Registration of Legitimation and Affidavit to Use Surname of Father (RA 9255)',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-people',
    description: 'For parents who married after their child was born (Legitimation), or unmarried parents who want their child to legally carry the father\'s surname (AUSF).',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '45 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: '₱1,325 to ₱1,885' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Parents or Legal Guardians',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Forms',
        description: 'Submit your compiled documents and affidavits to the LCR for review.',
      },
      {
        title: 'Payment',
        description: 'Proceed to the Treasurer\'s Office. Fees vary depending on whether you are filing for full Legitimation or just AUSF.',
      },
      {
        title: 'Registration',
        description: 'Return to the LCR to officially register the Legal Instrument. The child\'s records will be updated.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Core Documents',
        icon: 'bi-folder',
        items: [
          'Photocopy of Parents\' Valid IDs.',
          '3 Photocopies of Child\'s PSA Birth Certificate.',
          '3 Photocopies of Child\'s LCR Birth Certificate (back-to-back).',
        ],
      },
      {
        title: 'For Legitimation (Parents are now married)',
        icon: 'bi-diagram-2',
        items: [
          '3 Photocopies of PSA Certificate of No Marriage (CENOMAR) or Advisory of Marriage of Parents.',
          '3 Photocopies of Certified Marriage Certificate (Local or PSA Copy).',
          '4 Copies of Joint Affidavit of Legitimation by Subsequent Marriage (Get from Legal Office, 2nd Floor).',
        ],
      },
      {
        title: 'Affidavits (Get from Legal Office, 2nd Floor)',
        icon: 'bi-pen',
        items: [
          '4 Copies of Affidavit of Admission of Paternity (if applicable).',
          '4 Copies of Affidavit to Use the Surname of the Father (AUSF).',
          'Note on signing AUSF: 0-6 yrs old (Mother signs), 7-17 yrs old (Child signs, mother attests), 18+ yrs old (Child signs).',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Legitimation and AUSF?',
        answer: 'Legitimation is for parents who were unmarried when the child was born, but EVENTUALLY got married. AUSF is for parents who are STILL unmarried but want the child to use the father\'s last name.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Supplemental Report
   */
  {
    id: 'supplemental-report',
    title: 'Supplemental Report',
    fullTitle: 'Filing of Supplemental Report on Civil Documents',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-file-plus',
    description: 'Use this service if there are missing or blank entries (like missing middle name) in your Birth, Marriage, or Death Certificate that need to be filled in.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '40 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: '₱460.00' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Document Owner or Authorized Kin',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Requirements',
        description: 'Submit your incomplete PSA certificate and the supporting documents proving the missing information.',
      },
      {
        title: 'Payment',
        description: 'Pay the ₱460.00 processing fee at the Municipal Treasurer\'s Office.',
      },
      {
        title: 'Registration',
        description: 'Return to the LCR. They will process your Supplemental Report and forward the updated data to the PSA.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Requirements',
        icon: 'bi-ui-checks',
        items: [
          '3 Copies of Affidavit of Supplemental Report.',
          '3 Photocopies of PSA Birth, Marriage, or Death Certificate.',
          'At least 3 supporting documents (3 photocopies each) such as: Baptismal Certificate, Valid ID, School Record (Form 137/TOR), Voter\'s Registration, or PhilHealth MDR.',
        ],
      },
    ],
    faqs: [],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Certified True Copy (LCR)
   */
  {
    id: 'certified-true-copy-lcr',
    title: 'Certified True Copy (LCR)',
    fullTitle: 'Issuance of Certified Photocopy of Civil Documents',
    category: 'Civil Registry',
    categoryLink: '/services/civil-registry',
    badgeText: 'Civil Registry',
    badgeIcon: 'bi-printer',
    description: 'Get a Local Civil Registrar (LCR) certified true copy of your Birth, Marriage, or Death certificate. Often required for school, employment, or passport applications.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '26 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: '₱105.00 per copy' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Document Owner or Authorized Rep',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Verification',
        description: 'Provide the exact details (Name, Date, Place of Birth/Marriage/Death) to the LCR staff so they can locate your record in the local archives.',
      },
      {
        title: 'Payment',
        description: 'Once found, you will be given an Order of Payment. Pay ₱105.00 per copy at the Treasurer\'s Office.',
      },
      {
        title: 'Claim Document',
        description: 'Return your receipt to the LCR to receive your freshly stamped and signed Certified True Copy.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Requirements',
        icon: 'bi-file-earmark',
        items: [
          'Owner\'s Copy of Birth, Marriage, or Death Certificate (if available).',
          'Exact Date & Place of the event (Must have occurred in Binangonan only).',
          'If you are not the owner: Authorization letter and a photocopy of the owner\'s Valid ID.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I get a copy if I was born in another municipality?',
        answer: 'No. The Binangonan LCR only holds local archives. If you were born or married in another town, you must request it from that specific municipality or directly from the PSA.',
      },
    ],
    office: {
      name: 'Local Civil Registrar',
      location: 'Municipal Hall',
      email: 'lcr@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Civil Registry Requirements',
  },

  /**
   * ? MARK: Assess: Building Assessment
   */
  {
    id: 'assessment-of-building',
    title: 'Building Assessment',
    fullTitle: 'Assessment of New Building or Improvement',
    category: 'Assessor',
    categoryLink: '/services/assessor',
    badgeText: 'Property & Taxes',
    badgeIcon: 'bi-house-add',
    description: 'After securing your Occupancy Permit, you must declare your newly constructed building, house, or renovation to the Assessor\'s Office to update your Real Property Tax (Amilyar) records.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: 'Subject to Schedule' },
      { icon: 'bi-cash', label: 'Fee', value: '₱300.00 Base (+ Late Fees if applicable)' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Reps',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Requirements',
        description: 'Submit your Occupancy Permit, Building Plans, and property documents to the Municipal Assessor\'s Office for evaluation.',
      },
      {
        title: 'Schedule Inspection',
        description: 'The Assessor\'s team will schedule and conduct an ocular inspection of your new building to determine its current market value and assessment level.',
      },
      {
        title: 'Pay Assessment Fees',
        description: 'Proceed to the Municipal Treasurer to pay the Inspection Fee (₱250) and Sworn Statement Fee (₱50). Note: Late filings under Sec. 203 of RA 7160 will incur a higher Sworn Statement fee of ₱120.',
      },
      {
        title: 'Claim Updated Tax Dec',
        description: 'Once processed, claim your new Tax Declaration which now includes the assessed value of your new building/improvement.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Engineering Clearances',
        icon: 'bi-building-check',
        items: [
          'Building Permit and Occupancy Permit.',
          'Complete Building Plan.',
        ],
      },
      {
        title: 'Property & Identity Documents',
        icon: 'bi-file-earmark-person',
        items: [
          'Proof of Land Tax Payment (Latest Amilyar Receipt).',
          'Photocopy of Land Title or existing Tax Declaration.',
          'Photocopy of Owner’s Valid ID.',
          'Sworn Statement.',
        ],
      },
      {
        title: 'If Applied Through a Representative',
        icon: 'bi-person-vcard',
        items: [
          'Special Power of Attorney (SPA) or Authorization Letter.',
          'Valid IDs of both the owner and the representative.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When should I file for building assessment?',
        answer: 'You must declare your new building or improvements within 60 days of completion or occupancy. Failing to do so will result in late filing penalties under RA 7160.',
      },
    ],
    office: {
      name: 'Municipal Assessor\'s Office',
      location: 'Municipal Hall',
      email: 'assessor@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [
      {
        title: 'Need a map or copies? Request Assessor Certifications',
        link: '/service-details/assessor-certifications',
      },
    ],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Assessor Requirements',
  },

  /**
   * ? MARK: Assess: Certifications & Clearances
   */
  {
    id: 'assessor-certifications',
    title: 'Assessor Certifications',
    fullTitle: 'Request for Tax Declarations, Tax Maps, and Tracebacks',
    category: 'Assessor',
    categoryLink: '/services/assessor',
    badgeText: 'Property & Taxes',
    badgeIcon: 'bi-map',
    description: 'Secure official certified true copies of your property records, digitized tax maps, or verify the historical ownership traceback of a land parcel.',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: 'Same Day' },
      { icon: 'bi-cash', label: 'Fee', value: '₱50 to ₱400 depending on request' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Property Owners or Authorized Reps',
      },
      { icon: 'bi-calendar-check', label: 'Application', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description: 'Proceed to the Assessor\'s Office and submit your property details (PIN, Title Number, or previous Tax Dec) along with your Valid ID.',
      },
      {
        title: 'Payment',
        description: 'Pay the exact requested document fees at the Municipal Treasurer\'s Office.',
      },
      {
        title: 'Claim Document',
        description: 'Return your Official Receipt to the Assessor\'s Office releasing window to claim your signed and sealed documents.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Standard Requirements',
        icon: 'bi-file-text',
        items: [
          'Property Details (Photocopy of old Tax Declaration, Title, or specific property address and owner).',
          'Photocopy of Owner’s Valid ID.',
        ],
      },
      {
        title: 'If Applied Through a Representative',
        icon: 'bi-person-vcard',
        items: [
          'Special Power of Attorney (SPA) or Authorization Letter.',
          'Valid IDs of both the owner and the representative.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much are the specific document fees?',
        answer: 'Certified True Copy of Tax Dec (₱150) | Digitized Tax Map (₱120) | Cert. of Land Holding / No Improvement (₱150) | Traceback (₱120 + ₱50 per series) | Certified True Copy of Documents (₱50/page) | Survey Fee (₱400/lot).',
      },
    ],
    office: {
      name: 'Municipal Assessor\'s Office',
      location: 'Municipal Hall',
      email: 'assessor@binangonan.gov.ph',
      hours: 'Monday to Friday, 8:00 AM - 5:00 PM',
    },
    relatedServices: [],
    onlineLink: '',
    formLink: '',
    applicationMethod: 'Walk-in',
    sourceUrl: 'https://binangonan.gov.ph/citizens-charter/',
    sourceName: 'Official LGU Assessor Requirements',
  },
]

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = serviceDetailsContent.find(service => service.id === slug)

  if (!service || service.hidden)
    return undefined

  return service
}
