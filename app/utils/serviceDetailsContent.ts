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
   * Certificates & Vital Records
   */
  {
    id: 'birth-certificate',
    title: 'Birth Certificate',
    fullTitle: 'Birth Certificate (Local Copy)',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'Certificates',
    badgeIcon: 'bi-file-earmark-text',
    description:
      'Official certified copy of birth certificate registered in your city',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '15-30 Minutes' },
      { icon: 'bi-cash', label: 'Fee', value: '₱75/copy' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Owner/Representative',
      },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Check Eligibility',
        description:
          'You can request if you are the owner, parent/guardian, or authorized representative with proper authorization letter.',
      },
      {
        title: 'Prepare Documents',
        description:
          'Bring valid government-issued ID. If representative: authorization letter and IDs of both owner and representative.',
      },
      {
        title: 'Visit Civil Registrar',
        description:
          'Go to the City Civil Registrar Office - Window 4 at 2nd Floor, City Hall. Office hours: Mon-Fri, 8AM-5PM.',
      },
      {
        title: 'Fill Out Request Form',
        description:
          'Complete the request form / verification slip with full name, date of birth, place of birth, parents\' names, and purpose.',
      },
      {
        title: 'Pay the Fee',
        description:
          'Pay ₱75 per certified copy at Window 2 or 3 of the Civil Registrar or at the City Treasurer\'s Office (same building).',
      },
      {
        title: 'Claim Certificate',
        description:
          'Return to Civil Registrar Window 4 with official receipt. Certificate released within 15-30 minutes if record is available.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'If You Are the Owner',
        icon: 'bi-person',
        items: [
          'Valid government-issued ID (original + photocopy)',
          'Payment: ₱75 cash per copy',
        ],
      },
      {
        title: 'If You Are a Representative',
        icon: 'bi-people',
        items: [
          'Authorization letter signed by the owner',
          'Valid ID of the owner (photocopy)',
          'Valid ID of the representative (original + photocopy)',
          'Payment: ₱75 cash per copy',
        ],
      },
    ],
    faqs: [
      {
        question:
          'Can I get a birth certificate registered in another city?',
        answer:
          'No. The City Civil Registrar only has records for births registered in this city. For other cities, request from that city\'s Civil Registrar or from PSA.',
      },
      {
        question: 'What if I don\'t know the exact date of birth?',
        answer:
          'Provide an approximate year and month. The staff will help search the records, but this may take longer.',
      },
      {
        question: 'Can I request through email or online?',
        answer:
          'Currently, requests must be made in person. Online services are being planned for the future.',
      },
      {
        question: 'What\'s the difference between local copy and PSA copy?',
        answer:
          'Both are certified true copies. PSA copies are nationally-recognized and required for passport/visa applications. Local copies are accepted for most local transactions and school enrollment.',
      },
    ],
    office: {
      name: 'City Civil Registrar',
      location: 'City Hall, 2nd Floor',
      phone: '0920 425 8214',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Marriage Certificate',
        link: '/service-details/marriage-certificate',
      },
      {
        title: 'Death Certificate',
        link: '/service-details/death-certificate',
      },
      { title: 'Barangay Clearance', link: '/services/certificates' },
    ],
  },
  {
    id: 'marriage-certificate',
    title: 'Marriage Certificate',
    fullTitle: 'Marriage Certificate Registration & Copy',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'Certificates',
    badgeIcon: 'bi-heart',
    description:
      'Register or request certified true copy of marriage certificate',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '3-10 Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱150 (Registration)' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Spouses/Representative',
      },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Gather Documents',
        description:
          'Prepare marriage certificate from solemnizing officer and valid IDs.',
      },
      {
        title: 'Visit Civil Registrar',
        description:
          'Go to the Civil Registrar Office, 2nd Floor, City Hall.',
      },
      {
        title: 'Submit Documents & Verification',
        description:
          'Submit marriage certificate and supporting documents for registration at Window 5. Staff verifies document authenticity and completeness.',
      },
      {
        title: 'Payment',
        description: 'Pay the Solemnization Fee of ₱150 at Window 2 or 3 in the Civil Registrar Office.',
      },
      {
        title: 'Registration',
        description: 'Marriage is officially registered in the Civil Registry.',
      },
      {
        title: 'Claim Certificate',
        description:
          'Receive certified copy of registered marriage certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Timely Registration',
        icon: 'bi-file-text',
        items: [
          'Duly accomplished Certificate of Marriage - 4 copies',
          'Marriage solemnized outside Churches or Municipal Court must submit a Request address to solemnizing officer for celebration of Marriage in a place other than those authorized by law',
          'Valid IDs of both spouses',
          'Marriage license (if applicable)',
        ],
      },
      {
        title: 'For Late Registration',
        icon: 'bi-file-text',
        items: [
          'Duly accomplished Certificate of Marriage - 4 copies',
          'Certificate of Marriage of contracting parties',
          'Valid IDs of both spouses',
          'Marriage license (if applicable)',
        ],
      },
      {
        title: 'For Copy Request',
        icon: 'bi-files',
        items: [
          'Valid ID of spouse or authorized representative',
          'Authorization letter (if representative)',
          'Payment: ₱75 per copy',
        ],
      },
    ],
    faqs: [
      {
        question: 'How soon after the wedding should I register?',
        answer:
          'Within 30 days of the marriage ceremony. Late registration may require additional documents.',
      },
      {
        question: 'Can I get a copy if I was married elsewhere?',
        answer:
          'Only marriages registered in this city are available. Request from the city where you were married or from PSA.',
      },
    ],
    office: {
      name: 'City Civil Registrar',
      location: 'City Hall, 2nd Floor',
      phone: '0920 425 8214',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Birth Certificate',
        link: '/service-details/birth-certificate',
      },
      { title: 'CENOMAR', link: '/services/certificates' },
    ],
  },
  {
    id: 'death-certificate',
    title: 'Death Certificate',
    fullTitle: 'Death Certificate Registration & Burial Permit',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'Certificates',
    badgeIcon: 'bi-file-earmark-x',
    description: 'Register death certificate and obtain burial/transfer permit',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '~1.5 Hours' },
      { icon: 'bi-cash', label: 'Fee', value: '₱75-150' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Immediate Family',
      },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Obtain Medical Certificate',
        description:
          'Get certificate of death from attending physician or hospital.',
      },
      {
        title: 'Visit Civil Registrar',
        description:
          'Go to Civil Registrar at Window 5 with death certificate within 48 hours.',
      },
      {
        title: 'Complete Registry',
        description: 'Staff registers death in civil registry.',
      },
      {
        title: 'Pay Fees',
        description:
          'Pay registration of ₱75, ₱150 if late, and burial permit fees at Window 2 or 3 in the Civil Registrar Office or at the City Treasurer\'s Office.',
      },
      {
        title: 'Claim Permits',
        description: 'Receive burial permit and certified death certificate at Window 5.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Timely Registration',
        icon: 'bi-file-text',
        items: [
          'Certificate of Death - 4 copies',
          'Valid ID of informant',
          'Valid ID of deceased (if available)',
        ],
      },
      {
        title: 'For Late Registration',
        icon: 'bi-file-text',
        items: [
          'Negative Certification from Philippine Statistics Authority',
          'Duly accomplished Certificate of Death or Certificate of Fetal Death',
          'Certification from the Cemetery',
          'Valid ID of informant',
          'Valid ID of deceased (if available)',
        ],
      },
    ],
    faqs: [
      {
        question: 'How soon must death be registered?',
        answer:
          'Within 48 hours of death. Late registration requires additional documents and fees.',
      },
      {
        question: 'Do I need a burial permit?',
        answer:
          'Yes, burial permit is required before interment in any cemetery.',
      },
      {
        question: 'How long is the posting period for Late Registration?',
        answer:
          'Evaluator shall prepare documents for posting within 10 days, and the release of Certified True Copy is expiration of 10 days posting period.',
      },
    ],
    office: {
      name: 'City Civil Registrar',
      location: 'City Hall, 2nd Floor',
      phone: '0920 425 8214',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Birth Certificate',
        link: '/service-details/birth-certificate',
      },
      { title: 'CSWDO Services', link: '/service-details/cswdo-services' },
    ],
  },
  {
    id: 'city-civil-registrar',
    title: 'City Civil Registrar',
    fullTitle: 'City Civil Registrar Office',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'Office',
    badgeIcon: 'bi-building',
    description:
      'Birth, death, marriage registration, corrections, and certified copies',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '0920 425 8214' },
      {
        icon: 'bi-geo-alt',
        label: 'Location',
        value: '2nd Floor, City Hall',
      },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Identify Service',
        description: 'Determine what civil registry service you need.',
      },
      {
        title: 'Prepare Documents',
        description: 'Gather all required documents for your transaction.',
      },
      {
        title: 'Visit Office',
        description: 'Go to Civil Registrar, 2nd Floor of City Hall.',
      },
      {
        title: 'Submit Application',
        description: 'Submit documents and pay applicable fees.',
      },
      {
        title: 'Claim Documents',
        description: 'Return to claim processed documents.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Requirements',
        icon: 'bi-file-text',
        items: [
          'Valid government-issued ID',
          'Accomplished request form',
          'Payment of applicable fees',
        ],
      },
    ],
    faqs: [
      {
        question: 'What services are offered?',
        answer:
          'Birth, death, marriage registration; certified copies; corrections; late registration; legitimation; and other civil registry services.',
      },
    ],
    office: {
      name: 'City Civil Registrar',
      location: 'City Hall, 2nd Floor',
      phone: '0920 425 8214',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Birth Certificate',
        link: '/service-details/birth-certificate',
      },
      {
        title: 'Marriage Certificate',
        link: '/service-details/marriage-certificate',
      },
      {
        title: 'Death Certificate',
        link: '/service-details/death-certificate',
      },
    ],
  },
  {
    id: 'human-resource-management',
    title: 'Human Resource Management',
    fullTitle: 'Human Resource Management Office',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'HR',
    badgeIcon: 'bi-people',
    description:
      'Service records, employment certificates, and HR services for LGU employees',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free (employees)' },
      { icon: 'bi-person-check', label: 'For', value: 'LGU Employees' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description:
          'File request for the service record or certificate you need.',
      },
      {
        title: 'Verification',
        description: 'HRMO verifies employment records.',
      },
      {
        title: 'Processing',
        description: 'Staff prepares the requested document.',
      },
      {
        title: 'Claim Document',
        description: 'Return to claim service record or certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Service Record',
        icon: 'bi-file-text',
        items: [
          'Request form',
          'Valid ID',
          'Previous service record (if available)',
        ],
      },
    ],
    faqs: [
      {
        question: 'Who can request service records?',
        answer: 'Current and former LGU employees for their own records.',
      },
    ],
    office: {
      name: 'HRMO',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Employment Certification', link: '/services/certificates' },
    ],
  },

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
    sourceName: 'Official LGU Business Permit Requirements (2025 Citizen\'s Charter)',
  },

  {
    id: 'tricycle-franchising',
    hidden: true,
    title: 'Tricycle Franchising',
    fullTitle: 'Tricycle Franchise Application',
    category: 'Business',
    categoryLink: '/services/business',
    badgeText: 'Business',
    badgeIcon: 'bi-bicycle',
    description: 'Application for tricycle-for-hire franchise',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '3-5 Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱500' },
      {
        icon: 'bi-person-check',
        label: 'Who Can Apply',
        value: 'Owner/Operator',
      },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Prepare Requirements',
        description:
          'Gather vehicle registration, driver\'s license, and barangay clearance.',
      },
      {
        title: 'Submit Application',
        description: 'File application at the City Traffic Office.',
      },
      {
        title: 'Vehicle Inspection',
        description: 'Have your tricycle inspected for safety compliance.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay franchise fee at City Treasurer\'s Office.',
      },
      {
        title: 'Claim Franchise',
        description: 'Return to claim franchise certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Required Documents',
        icon: 'bi-file-text',
        items: [
          'OR/CR of tricycle motorcycle',
          'Valid driver\'s license',
          'Barangay clearance',
          'Police clearance',
          'TODA Endorsement/Certification',
          '2x2 ID pictures',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long is the franchise valid?',
        answer: 'Usually 3 years, subject to annual renewal of registration.',
      },
    ],
    office: {
      name: 'City Traffic Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      {
        title: 'New Business Permit',
        link: '/service-details/business-permit-new',
      },
    ],
  },

  /**
   * Taxation & Payments
   */
  {
    id: 'city-assessor',
    title: 'City Assessor\'s Office',
    fullTitle: 'City Assessor\'s Office',
    category: 'Taxation',
    categoryLink: '/services/tax-payments',
    badgeText: 'Taxation',
    badgeIcon: 'bi-house-door',
    description: 'Property assessment, tax declarations, and land records',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '1-5 Days' },
      { icon: 'bi-file-text', label: 'Records', value: 'Property Info' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Online / Walk-in' },
    ],
    processSteps: [
      {
        title: 'Identify Transaction',
        description:
          'Determine if you need transfer, update, or new declaration.',
      },
      {
        title: 'Submit Documents',
        description:
          'Submit deed of sale, title, or other supporting documents.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay transfer tax and processing fees.',
      },
      {
        title: 'Wait for Processing',
        description: 'Allow 1-5 days for assessment and approval.',
      },
      {
        title: 'Claim Declaration',
        description: 'Return to claim new tax declaration.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Transfer',
        icon: 'bi-arrow-left-right',
        items: [
          'Deed of Absolute Sale',
          'Transfer Certificate of Title',
          'Tax Clearance',
          'Previous Tax Declaration',
          'Valid IDs',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long is a tax declaration valid?',
        answer:
          'Until the property is transferred or there are changes requiring reassessment.',
      },
    ],
    office: {
      name: 'City Assessor\'s Office',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Treasurer',
        link: '/service-details/city-treasurer',
      },
      {
        title: 'Property Declaration',
        link: '/service-details/property-declaration',
      },
    ],
  },
  {
    id: 'city-treasurer',
    hidden: true,
    title: 'City Treasurer\'s Office',
    fullTitle: 'City Treasurer\'s Office',
    category: 'Taxation',
    categoryLink: '/services/tax-payments',
    badgeText: 'Taxation',
    badgeIcon: 'bi-cash-coin',
    description: 'Tax payments, revenue collection, and tax clearances',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '15-30 Minutes' },
      { icon: 'bi-cash', label: 'Payment Methods', value: 'Cash/Check' },
      { icon: 'bi-calendar', label: 'Deadline', value: 'Jan 31 (RPT)' },
      { icon: 'bi-percent', label: 'Discount', value: '10% if paid early' },
    ],
    processSteps: [
      {
        title: 'Get Tax Bill',
        description: 'Request your tax bill or assessment from the office.',
      },
      {
        title: 'Verify Amount',
        description: 'Check the details and amount due.',
      },
      { title: 'Make Payment', description: 'Pay at the cashier window.' },
      {
        title: 'Claim Receipt',
        description: 'Keep official receipt for your records.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Real Property Tax',
        icon: 'bi-house',
        items: [
          'Tax Declaration Number',
          'Previous Official Receipt',
          'Valid ID',
        ],
      },
      {
        title: 'For Business Tax',
        icon: 'bi-shop',
        items: ['Business Permit', 'Assessment from BPLO', 'Valid ID'],
      },
    ],
    faqs: [
      {
        question: 'Is there a discount for early payment?',
        answer: 'Yes, 10% discount for RPT paid in full before January 31.',
      },
      {
        question: 'Can I pay quarterly?',
        answer: 'Yes, RPT can be paid quarterly without discount.',
      },
    ],
    office: {
      name: 'City Treasurer\'s Office',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Property Declaration',
        link: '/service-details/property-declaration',
      },
      {
        title: 'City Assessor',
        link: '/service-details/municipal-assessor',
      },
    ],
    onlineLink: 'https://cityoflaspinas.ph/',
  },
  {
    id: 'property-declaration',
    title: 'Property Declaration',
    fullTitle: 'Tax Declaration & Property Records',
    category: 'Taxation',
    categoryLink: '/services/tax-payments',
    badgeText: 'Taxation',
    badgeIcon: 'bi-file-text',
    description: 'Transfer or update of property tax declaration',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱50-100' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Assessor\'s Office' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Gather Documents',
        description:
          'Prepare deed of sale, title, and previous tax declaration.',
      },
      {
        title: 'Submit to Assessor',
        description: 'Submit documents at the City Assessor\'s Office.',
      },
      { title: 'Pay Transfer Tax', description: 'Pay at Treasurer\'s Office.' },
      {
        title: 'Claim New Declaration',
        description: 'Return to claim updated tax declaration.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Required Documents',
        icon: 'bi-file-text',
        items: [
          'Notarized Deed of Sale',
          'Transfer Certificate of Title',
          'Tax Clearance',
          'Valid IDs of buyer and seller',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the transfer tax rate?',
        answer:
          'Usually 0.5% to 0.75% of the selling price or zonal value, whichever is higher.',
      },
    ],
    office: {
      name: 'City Assessor\'s Office',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Assessor',
        link: '/service-details/municipal-assessor',
      },
      {
        title: 'City Treasurer',
        link: '/service-details/city-treasurer',
      },
    ],
  },

  /**
   * Social Services
   */
  {
    id: 'cswdo-services',
    title: 'CSWDO Services',
    fullTitle: 'City Social Welfare & Development Office',
    category: 'Social Services',
    categoryLink: '/services/social-services',
    badgeText: 'Social Services',
    badgeIcon: 'bi-people',
    description: 'Social welfare programs, IDs, and financial assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: 'Varies' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free' },
      { icon: 'bi-telephone', label: 'Hotline', value: '0916 284 0885' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Identify Program',
        description: 'Determine which social welfare program you need.',
      },
      {
        title: 'Prepare Documents',
        description: 'Gather required documents for the specific program.',
      },
      {
        title: 'Visit CSWDO',
        description: 'Go to CSWDO office at the City Hall.',
      },
      {
        title: 'Submit Application',
        description: 'Submit application and documents for assessment.',
      },
      {
        title: 'Receive Assistance',
        description:
          'If approved, receive the corresponding benefit or service.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Senior Citizen ID',
        icon: 'bi-person-vcard',
        items: [
          'Proof of age (birth certificate or valid ID)',
          'Barangay certification',
          '1x1 ID picture',
        ],
      },
      {
        title: 'For PWD ID',
        icon: 'bi-universal-access',
        items: [
          'Medical certificate of disability',
          'Barangay certification',
          '1x1 ID picture',
        ],
      },
      {
        title: 'For Financial Assistance',
        icon: 'bi-wallet2',
        items: [
          'Barangay certification of indigency',
          'Valid ID',
          'Case study/assessment by CSWDO',
        ],
      },
    ],
    faqs: [
      {
        question: 'What assistance programs are available?',
        answer:
          'Senior Citizen ID, PWD ID, Solo Parent ID, financial assistance, burial assistance, medical assistance, educational assistance, and various social welfare programs.',
      },
      {
        question: 'Who can apply for financial assistance?',
        answer: 'Indigent families and individuals in crisis situations.',
      },
    ],
    office: {
      name: 'CSWDO',
      location: 'City Hall, Ground Floor',
      phone: '0916 284 0885',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Senior Citizen Services', link: '/services/social-services' },
      { title: 'PWD Services', link: '/services/social-services' },
    ],
  },
  {
    id: 'cswdo',
    title: 'CSWDO',
    fullTitle: 'City Social Welfare & Development Office',
    category: 'Social Services',
    categoryLink: '/services/social-services',
    badgeText: 'Office',
    badgeIcon: 'bi-building',
    description: 'Social welfare programs and community development',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Hotline', value: '0916 284 0885' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
      { icon: 'bi-cash', label: 'Services', value: 'Free' },
    ],
    processSteps: [
      {
        title: 'Visit Office',
        description: 'Go to CSWDO at City Hall ground floor.',
      },
      {
        title: 'State Your Concern',
        description: 'Inform staff of the assistance or service you need.',
      },
      {
        title: 'Assessment',
        description: 'CSWDO staff will assess your situation.',
      },
      {
        title: 'Receive Assistance',
        description: 'Get appropriate assistance based on assessment.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Requirements',
        icon: 'bi-file-text',
        items: [
          'Valid ID',
          'Barangay certification',
          'Supporting documents based on program',
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the office hours?',
        answer: 'Monday to Thursday, 8:00 AM to 7:00 PM.',
      },
    ],
    office: {
      name: 'CSWDO',
      location: 'City Hall, Ground Floor',
      phone: '0916 284 0885',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'CSWDO Services', link: '/service-details/cswdo-services' },
    ],
  },

  /**
   * Agriculture
   */
  {
    id: 'city-agriculture',
    title: 'City Agriculture Office',
    fullTitle: 'City Agriculture Office (MAGRO)',
    category: 'Agriculture',
    categoryLink: '/services/agriculture',
    badgeText: 'Agriculture',
    badgeIcon: 'bi-tree',
    description: 'Agricultural programs, farmer registration, and assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-cash', label: 'Programs', value: 'Free/Subsidized' },
    ],
    processSteps: [
      {
        title: 'Visit MAGRO',
        description: 'Go to City Agriculture Office at City Hall.',
      },
      {
        title: 'Farmer Registration',
        description: 'Register under RSBSA if not yet registered.',
      },
      {
        title: 'Identify Program',
        description: 'Inquire about available programs and assistance.',
      },
      {
        title: 'Submit Requirements',
        description: 'Submit documents for the program you are applying for.',
      },
      {
        title: 'Receive Assistance',
        description: 'Get subsidized inputs, training, or other assistance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For RSBSA Registration',
        icon: 'bi-card-list',
        items: [
          'Valid ID',
          'Barangay certification of farmer status',
          'Proof of land ownership or tenant agreement',
          '1x1 ID picture',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is RSBSA?',
        answer:
          'Registry System for Basic Sectors in Agriculture - a prerequisite for accessing government agricultural programs.',
      },
      {
        question: 'What assistance is available?',
        answer:
          'Fertilizer subsidy, seeds distribution, livestock dispersal, crop insurance, and technical training.',
      },
    ],
    office: {
      name: 'City Agriculture Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Fertilizer Assistance', link: '/services/agriculture' },
      { title: 'Crop Insurance', link: '/services/agriculture' },
    ],
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
    fullTitle: 'Registration of Birth Certificates (Timely & Late)',
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

  {
    id: 'municipal-engineering',
    title: 'Municipal Engineering Office',
    fullTitle: 'Municipal Engineering Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-building-gear',
    description: 'Building permits, construction, and infrastructure projects',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '5-10 Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Varies' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Secure Zoning Clearance',
        description: 'Get zoning clearance from Planning Office.',
      },
      {
        title: 'Prepare Plans',
        description:
          'Prepare building plans signed by licensed engineer/architect.',
      },
      {
        title: 'Submit Application',
        description: 'File building permit application with requirements.',
      },
      {
        title: 'Site Inspection',
        description: 'City engineer conducts site inspection.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay permit fees at Treasurer\'s Office.',
      },
      {
        title: 'Claim Permit',
        description: 'Return to Engineering to claim building permit.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Building Permit',
        icon: 'bi-building',
        items: [
          'Zoning clearance',
          'Building plans (5 sets) signed by licensed professional',
          'Land title or deed of sale',
          'Barangay clearance',
          'Fire safety evaluation clearance',
          'Structural analysis (for 2+ storeys)',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long is a building permit valid?',
        answer: 'Usually 1 year, extendable upon request.',
      },
      {
        question: 'Do I need a permit for renovations?',
        answer: 'Yes, any structural modification requires a building permit.',
      },
    ],
    office: {
      name: 'City Engineering Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      {
        title: 'City Planning',
        link: '/service-details/municipal-planning',
      },
      { title: 'Fire Safety Certificate', link: '/services/infrastructure' },
    ],
  },

  {
    id: 'city-planning',
    title: 'City Planning & Development',
    fullTitle: 'City Planning & Development Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-clipboard-data',
    description: 'Zoning, land use, and development planning',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '3-5 Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱100-500' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description: 'File zoning clearance request with location details.',
      },
      {
        title: 'Document Review',
        description: 'Planning office reviews land use compatibility.',
      },
      {
        title: 'Site Verification',
        description: 'Staff may conduct site visit if needed.',
      },
      { title: 'Pay Fees', description: 'Pay at Treasurer\'s Office.' },
      {
        title: 'Claim Clearance',
        description: 'Return to claim zoning clearance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Zoning Clearance',
        icon: 'bi-map',
        items: [
          'Tax declaration of property',
          'Lot plan or sketch of location',
          'Valid ID of applicant',
          'Purpose of application',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is zoning clearance?',
        answer:
          'A document certifying that your proposed use of the property is compatible with the zonal classification.',
      },
    ],
    office: {
      name: 'City Planning & Development Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Engineering',
        link: '/service-details/municipal-engineering',
      },
    ],
  },
  {
    id: 'city-general-services',
    title: 'City General Services',
    fullTitle: 'City General Services Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Services',
    badgeIcon: 'bi-tools',
    description: 'Equipment rental, vehicle use, and general services',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-cash', label: 'Rental', value: 'Varies' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description: 'File equipment or vehicle use request.',
      },
      { title: 'Approval', description: 'Wait for approval from GSO.' },
      { title: 'Pay Fees', description: 'Pay rental fees if applicable.' },
      {
        title: 'Use Equipment',
        description: 'Use equipment/vehicle as scheduled.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Equipment Request',
        icon: 'bi-file-text',
        items: [
          'Request letter',
          'Purpose of use',
          'Valid ID',
          'Payment (if applicable)',
        ],
      },
    ],
    faqs: [
      {
        question: 'What equipment is available?',
        answer:
          'Heavy equipment, service vehicles, and other municipal assets for public use.',
      },
    ],
    office: {
      name: 'General Services Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Infrastructure', link: '/services/infrastructure' },
    ],
  },

  /**
   * Budget
   */
  {
    id: 'city-budget',
    title: 'City Budget Office',
    fullTitle: 'City Budget Office',
    category: 'Budget',
    categoryLink: '/budget',
    badgeText: 'Budget',
    badgeIcon: 'bi-wallet2',
    description: 'Budget preparation, appropriation, and financial management',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-file-text', label: 'Reports', value: 'Public Access' },
    ],
    processSteps: [
      {
        title: 'Public Inquiry',
        description: 'For budget-related inquiries, visit the Budget Office.',
      },
      {
        title: 'Submit Request',
        description: 'Submit written request for specific budget information.',
      },
      {
        title: 'Processing',
        description: 'Office processes request and prepares information.',
      },
      {
        title: 'Receive Information',
        description: 'Receive requested budget documents.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Information Request',
        icon: 'bi-info-circle',
        items: ['Written request letter', 'Valid ID', 'Purpose of request'],
      },
    ],
    faqs: [
      {
        question: 'Is budget information available to the public?',
        answer:
          'Yes, municipal budget documents are public records accessible under the Freedom of Information.',
      },
    ],
    office: {
      name: 'City Budget Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Accounting',
        link: '/service-details/municipal-accounting',
      },
      { title: 'Budget Transparency', link: '/budget' },
    ],
  },
  {
    id: 'city-accounting',
    title: 'City Accounting Office',
    fullTitle: 'City Accounting Office',
    category: 'Budget',
    categoryLink: '/budget',
    badgeText: 'Budget',
    badgeIcon: 'bi-calculator',
    description: 'Financial transactions, payroll, and accounting records',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-file-text', label: 'Records', value: 'Financial' },
    ],
    processSteps: [
      {
        title: 'Identify Transaction',
        description: 'Determine what accounting service you need.',
      },
      {
        title: 'Submit Documents',
        description: 'Submit required documents for processing.',
      },
      {
        title: 'Verification',
        description: 'Accounting staff verifies and processes documents.',
      },
      {
        title: 'Completion',
        description: 'Receive processed documents or certificates.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Requirements',
        icon: 'bi-file-text',
        items: ['Official request letter', 'Supporting documents', 'Valid ID'],
      },
    ],
    faqs: [
      {
        question: 'What services are offered?',
        answer:
          'Financial statement verification, supplier payment processing, payroll services for LGU employees.',
      },
    ],
    office: {
      name: 'City Accounting Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'City Budget', link: '/service-details/municipal-budget' },
      {
        title: 'City Treasurer',
        link: '/service-details/city-treasurer',
      },
    ],
  },

  /**
   * Services
   */
  {
    id: 'general-services',
    title: 'General Services',
    fullTitle: 'General City Services',
    category: 'Services',
    categoryLink: '/services',
    badgeText: 'Services',
    badgeIcon: 'bi-grid',
    description: 'General public services and information',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-info-circle', label: 'Info Desk', value: 'Ground Floor' },
    ],
    processSteps: [
      {
        title: 'Visit Information Desk',
        description: 'Go to the ground floor information desk.',
      },
      {
        title: 'State Your Concern',
        description: 'Tell the staff what service you need.',
      },
      {
        title: 'Get Directions',
        description: 'Staff will direct you to the appropriate office.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Visit',
        icon: 'bi-person',
        items: ['Valid ID for most transactions'],
      },
    ],
    faqs: [
      {
        question: 'Where can I get information about services?',
        answer:
          'Visit the Information Desk at the ground floor of City Hall.',
      },
    ],
    office: {
      name: 'Information Desk',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [{ title: 'All Services', link: '/services' }],
  },

  /**
   * Health
   */
  {
    id: 'city-health',
    title: 'City Health Office',
    fullTitle: 'City Health Office',
    category: 'Health',
    categoryLink: '/services/health',
    badgeText: 'Health',
    badgeIcon: 'bi-heart-pulse',
    description: 'Public health services, vaccination, and medical assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(02) 8776-7268' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall Compound' },
      { icon: 'bi-heart', label: 'Services', value: 'Public Health' },
    ],
    processSteps: [
      {
        title: 'Visit CHO',
        description: 'Go to the City Health Office.',
      },
      {
        title: 'Triage/Assessment',
        description: 'Medical staff will assess your needs.',
      },
      {
        title: 'Receive Service',
        description: 'Receive vaccination, consultation, or assistance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General',
        icon: 'bi-file-text',
        items: ['Valid ID', 'Medical records (if applicable)'],
      },
    ],
    faqs: [
      {
        question: 'Is consultation free?',
        answer: 'Yes, basic consultation at the health office is free.',
      },
    ],
    office: {
      name: 'City Health Office',
      location: 'City Hall Compound',
      phone: '(02) 8776-7268',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      { title: 'Vaccination', link: '/service-details/vaccination' },
    ],
  },
  {
    id: 'vaccination',
    title: 'Vaccination Programs',
    fullTitle: 'Immunization & Vaccination Services',
    category: 'Health',
    categoryLink: '/services/health',
    badgeText: 'Health',
    badgeIcon: 'bi-shield-plus',
    description: 'Free immunization for children, adults, and senior citizens',
    quickStats: [
      { icon: 'bi-clock', label: 'Schedule', value: 'Mon-Fri' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Health Centers' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Registration',
        description: 'Register at the health center.',
      },
      {
        title: 'Screening',
        description: 'Health screening and vital signs check.',
      },
      {
        title: 'Vaccination',
        description: 'Administration of vaccine.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Children',
        icon: 'bi-person',
        items: ['Baby book / Immunization card'],
      },
    ],
    faqs: [
      {
        question: 'Are vaccines safe?',
        answer: 'Yes, all vaccines provided are DOH-approved and safe.',
      },
    ],
    office: {
      name: 'City Health Office',
      location: 'City Hall Compound',
      phone: '(02) 8776-7268',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      { title: 'City Health Office', link: '/service-details/city-health' },
    ],
  },

  /**
   * Public Safety
   */
  {
    id: 'cdrrmo',
    title: 'CDRRMO',
    fullTitle: 'City Disaster Risk Reduction and Management Office',
    category: 'Public Safety',
    categoryLink: '/services/public-safety',
    badgeText: 'Safety',
    badgeIcon: 'bi-shield-exclamation',
    description: 'Emergency response, disaster management, and rescue services',
    quickStats: [
      { icon: 'bi-clock', label: 'Operations', value: '24/7' },
      { icon: 'bi-telephone', label: 'Emergency', value: '(02) 8290-6500' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Command Center' },
      { icon: 'bi-shield', label: 'Service', value: 'Rescue' },
    ],
    processSteps: [
      {
        title: 'Call Emergency Hotline',
        description: 'Dial (02) 8290-6500 for emergencies.',
      },
      {
        title: 'Dispatch',
        description: 'Responders are dispatched to the location.',
      },
      {
        title: 'Response / Rescue',
        description: 'Emergency assistance is provided.',
        isFinal: true,
      },
    ],
    requirements: [],
    faqs: [
      {
        question: 'What is the emergency hotline?',
        answer: '(02) 8290-6500 or 911.',
      },
    ],
    office: {
      name: 'CDRRMO',
      location: 'Command Center',
      phone: '(02) 8290-6500',
      hours: '24/7 Operations',
    },
    relatedServices: [
      {
        title: 'Emergency Response',
        link: '/service-details/emergency-response',
      },
    ],
  },
  {
    id: 'emergency-response',
    title: 'Emergency Response',
    fullTitle: 'Emergency Rescue & Response',
    category: 'Public Safety',
    categoryLink: '/services/public-safety',
    badgeText: 'Safety',
    badgeIcon: 'bi-ambulance',
    description: '24/7 ambulance and rescue assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Response', value: 'Immediate' },
      { icon: 'bi-telephone', label: 'Hotline', value: '(02) 8290-6500' },
      { icon: 'bi-geo-alt', label: 'Coverage', value: 'Citywide' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free' },
    ],
    processSteps: [
      {
        title: 'Call Hotline',
        description: 'Call (02) 8290-6500 immediately.',
      },
      {
        title: 'Provide Info',
        description: 'State nature of emergency and exact location.',
      },
      {
        title: 'Wait for Help',
        description: 'Stay on the line if instructed. Responders are on the way.',
        isFinal: true,
      },
    ],
    requirements: [],
    faqs: [
      {
        question: 'Is ambulance service free?',
        answer: 'Yes, for emergency cases within the city.',
      },
    ],
    office: {
      name: 'CDRRMO',
      location: 'Command Center',
      phone: '(02) 8290-6500',
      hours: '24/7 Operations',
    },
    relatedServices: [
      { title: 'CDRRMO', link: '/service-details/cdrrmo' },
    ],
  },
]

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = serviceDetailsContent.find(service => service.id === slug)

  if (!service || service.hidden)
    return undefined

  return service
}
