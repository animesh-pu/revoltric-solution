export interface SolutionCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  products: string[];
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  categoryId: string;
  features: string[];
  specifications: Record<string, string>;
  applications: string[];
  image: string;
}

export interface Industry {
  name: string;
  icon: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectStep {
  step: string;
  title: string;
  description: string;
}

export const SOLUTIONS: SolutionCategory[] = [
  {
    id: "radiology",
    title: "Radiology",
    description: "Imaging and radiology solutions for modern diagnostic facilities.",
    icon: "scan",
    products: [
      "X-Ray Systems",
      "Digital X-Ray",
      "CT-Related Solutions",
      "MRI-Related Solutions",
      "Ultrasound Systems",
      "C-Arms",
      "Radiology Accessories",
      "Imaging Room Requirements",
    ],
  },
  {
    id: "pathology",
    title: "Pathology & Laboratory",
    description: "Complete laboratory and pathology solutions.",
    icon: "flask-conical",
    products: [
      "Biochemistry Analyzers",
      "Hematology Analyzers",
      "Immunoassay Systems",
      "Electrolyte Analyzers",
      "Clinical Chemistry",
      "Laboratory Equipment",
      "Microscopes",
      "Centrifuges",
      "Consumables",
      "Lab Accessories",
    ],
  },
  {
    id: "hospital-equipment",
    title: "Hospital Equipment",
    description: "Essential equipment for hospitals and healthcare facilities.",
    icon: "heart-pulse",
    products: [
      "Patient Monitors",
      "ECG Machines",
      "Infusion Pumps",
      "Ventilators",
      "Defibrillators",
      "ICU Equipment",
      "Operation Theatre Equipment",
      "Patient-Care Equipment",
    ],
  },
  {
    id: "consumables",
    title: "Laboratory & Diagnostic Consumables",
    description: "Professional consumables and day-to-day diagnostic requirements.",
    icon: "test-tubes",
    products: [
      "Diagnostic Reagents",
      "Test Kits",
      "Laboratory Consumables",
      "Sample Collection",
      "Safety Equipment",
    ],
  },
  {
    id: "infrastructure",
    title: "Hospital Infrastructure",
    description: "Equipment and solutions required to establish and maintain modern healthcare facilities.",
    icon: "building-2",
    products: [
      "Modular OT Setup",
      "ICU Setup",
      "Lab Design & Setup",
      "Imaging Suite Design",
      "HVAC for Healthcare",
      "Medical Gas Systems",
    ],
  },
  {
    id: "other",
    title: "Other Healthcare Solutions",
    description: "Additional healthcare products and categories tailored to specific facility needs.",
    icon: "plus-circle",
    products: [
      "Rehabilitation Equipment",
      "Dental Solutions",
      "Ophthalmology Equipment",
      "Sterilization Equipment",
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "digital-xray-system",
    name: "Digital X-Ray System",
    shortDescription: "High-resolution digital radiography system with advanced image processing for diagnostic imaging.",
    category: "Radiology",
    categoryId: "radiology",
    features: [
      "High-resolution flat-panel detector",
      "Advanced image processing algorithms",
      "Low dose radiation technology",
      "Intuitive operator interface",
      "DICOM 3.0 compatible",
      "Network-ready PACS integration",
    ],
    specifications: {
      "Detector Type": "Flat Panel Digital",
      "Resolution": "3.6 LP/mm",
      "Pixel Pitch": "148 μm",
      "DQE": ">70%",
      "Power Supply": "380V / 50Hz",
      "Workstation": "Dedicated imaging workstation included",
    },
    applications: ["General Radiography", "Chest Imaging", "Orthopedic Imaging", "Emergency Departments"],
    image: "",
  },
  {
    id: "portable-ultrasound",
    name: "Portable Ultrasound System",
    shortDescription: "Compact, high-performance ultrasound with multi-probe compatibility for point-of-care diagnostics.",
    category: "Radiology",
    categoryId: "radiology",
    features: [
      "Lightweight portable design",
      "Multi-probe compatibility",
      "Real-time color Doppler",
      "Built-in image storage",
      "Long battery life",
      "Touchscreen interface",
    ],
    specifications: {
      "Display": "15-inch LED",
      "Probes Supported": "Linear, Convex, Phased Array",
      "Modes": "B, M, Color Doppler, PW Doppler",
      "Image Storage": "Internal SSD + USB export",
      "Weight": "5.2 kg",
      "Battery": "Up to 2 hours continuous",
    },
    applications: ["Point-of-Care", "Emergency Medicine", "Obstetrics", "Cardiology"],
    image: "",
  },
  {
    id: "ct-scanner-solution",
    name: "CT Scanner Solution",
    shortDescription: "Advanced computed tomography system delivering fast, high-quality cross-sectional imaging.",
    category: "Radiology",
    categoryId: "radiology",
    features: [
      "High-speed spiral acquisition",
      "Low-dose protocols",
      "Multi-slice reconstruction",
      "Automated patient positioning",
      "Advanced 3D rendering",
      "AI-assisted diagnostics",
    ],
    specifications: {
      "Slices": "64 / 128 / 256 (configurable)",
      "Gantry Bore": "70 cm",
      "Rotation Speed": "0.35 seconds",
      "kV Range": "70–140 kV",
      "mAs Range": "10–800 mAs",
      "Software": "Full diagnostic viewer included",
    },
    applications: ["Neurology", "Oncology", "Cardiac", "Trauma", "Screening"],
    image: "",
  },
  {
    id: "c-arm-system",
    name: "C-Arm Imaging System",
    shortDescription: "Mobile C-arm for intraoperative imaging in surgical and interventional procedures.",
    category: "Radiology",
    categoryId: "radiology",
    features: [
      "High-resolution image intensifier",
      "Motorized orbital movement",
      "Pulsed fluoroscopy",
      "Last image hold",
      "Digital road mapping",
      "Compact mobile design",
    ],
    specifications: {
      "Image Intensifier": "9/6 inch",
      "Resolution": "2.5 LP/mm",
      "Dose Rate": "< 25 mGy/min",
      "Display": "Dual 19-inch monitors",
      "C-Arm Travel": "180° orbital, 190° wiggler",
      "Weight": "Approx. 350 kg",
    },
    applications: ["Orthopedic Surgery", "Cardiology", "Pain Management", "Vascular Procedures"],
    image: "",
  },
  {
    id: "biochemistry-analyzer",
    name: "Biochemistry Analyzer",
    shortDescription: "Fully automated clinical chemistry analyzer for high-throughput laboratory testing.",
    category: "Pathology & Laboratory",
    categoryId: "pathology",
    features: [
      "Fully automated operation",
      "High throughput capacity",
      "Refrigerated reagent storage",
      "Continuous sample loading",
      "Built-in quality control",
      " LIS connectivity",
    ],
    specifications: {
      "Throughput": "Up to 400 tests/hour",
      "Reagent Positions": "48",
      "Sample Positions": "60",
      "Wavelength": "340–800 nm",
      "Method": "Kinetic, End-point, Fixed-time",
      "Data Storage": "Unlimited patient records",
    },
    applications: ["Clinical Chemistry", "Liver Function", "Kidney Function", "Lipid Profile", "Diabetes"],
    image: "",
  },
  {
    id: "hematology-analyzer",
    name: "Hematology Analyzer",
    shortDescription: "Advanced 5-part differential hematology analyzer for complete blood count analysis.",
    category: "Pathology & Laboratory",
    categoryId: "pathology",
    features: [
      "5-part WBC differential",
      "Automated CBC analysis",
      "Reticulocyte counting",
      "Body fluid analysis mode",
      "High throughput",
      "Minimal sample volume",
    ],
    specifications: {
      "Parameters": "26+ parameters",
      "Throughput": "Up to 100 samples/hour",
      "Sample Volume": "20 μL (whole blood)",
      "Display": "10.4-inch touchscreen",
      "Data Storage": "100,000 results",
      "Connectivity": "RS-232, USB, LAN",
    },
    applications: ["Complete Blood Count", "Hematology Labs", "Blood Banks", "Point-of-Care Testing"],
    image: "",
  },
  {
    id: "patient-monitor",
    name: "Patient Monitor System",
    shortDescription: "Multi-parameter patient monitoring system for ICU, OT, and general ward environments.",
    category: "Hospital Equipment",
    categoryId: "hospital-equipment",
    features: [
      "Multi-parameter monitoring",
      "High-resolution color display",
      "Built-in rechargeable battery",
      "Network central monitoring",
      "Alarm management system",
      "Trend data storage",
    ],
    specifications: {
      "Display": "12.1-inch color TFT",
      "Parameters": "ECG, SpO2, NIBP, Temp, Resp, EtCO2",
      "Battery Life": "Up to 4 hours",
      "Alarm": "Visual + Audible + Visible",
      "Network": "Wired / Wireless central",
      "Weight": "3.5 kg",
    },
    applications: ["ICU", "Operation Theatre", "Emergency", "General Ward", "Step-down Units"],
    image: "",
  },
  {
    id: "ventilator",
    name: "Mechanical Ventilator",
    shortDescription: "Advanced ICU ventilator with multiple ventilation modes and intelligent patient support.",
    category: "Hospital Equipment",
    categoryId: "hospital-equipment",
    features: [
      "Multiple ventilation modes",
      "Intelligent triggering",
      "Touchscreen interface",
      "Built-in nebulizer",
      "Low flow oxygen therapy",
      "Pediatric & adult capability",
    ],
    specifications: {
      "Modes": "VC, PC, SIMV, CPAP, PS, Manual",
      "Tidal Volume": "20–2000 mL",
      "Respiratory Rate": "1–100 bpm",
      "Display": "10.4-inch color touchscreen",
      "Oxygen Source": "Compressed air + O2",
      "Battery Backup": "Up to 2 hours",
    },
    applications: ["ICU", "Emergency Medicine", "Anesthesia", "Neonatal Care", "Transport"],
    image: "",
  },
  {
    id: "infusion-pump",
    name: "Infusion Pump",
    shortDescription: "Precision volumetric infusion pump with drug library and safety alarm system.",
    category: "Hospital Equipment",
    categoryId: "hospital-equipment",
    features: [
      "Volumetric precision delivery",
      "Comprehensive drug library",
      "Air-in-line detection",
      "Occlusion detection",
      "Battery backup",
      "Stackable design",
    ],
    specifications: {
      "Flow Rate": "0.1–1200 mL/hr",
      "Volume Range": "1–9999 mL",
      "Accuracy": "±5%",
      "Display": "4.3-inch color LCD",
      "Battery": "Up to 4 hours",
      "Alarms": "8 alarm categories",
    },
    applications: ["ICU", "General Ward", "Oncology", "Pediatrics", "Emergency"],
    image: "",
  },
  {
    id: "centrifuge",
    name: "Laboratory Centrifuge",
    shortDescription: "High-speed refrigerated centrifuge for clinical and research laboratory applications.",
    category: "Pathology & Laboratory",
    categoryId: "pathology",
    features: [
      "Refrigerated operation",
      "Programmable protocols",
      "Multiple rotor options",
      "Automatic lid lock",
      "Imbalance detection",
      "Quiet operation",
    ],
    specifications: {
      "Max Speed": "15,000 RPM",
      "Max RCF": "21,130 × g",
      "Temperature Range": "-20°C to +40°C",
      "Capacity": "Up to 6 × 100 mL",
      "Timer": "1–99 min, continuous",
      "Noise Level": "< 56 dB",
    },
    applications: ["Clinical Chemistry", "Blood Separation", "Urine Analysis", "Research"],
    image: "",
  },
  {
    id: "ecg-machine",
    name: "12-Lead ECG Machine",
    shortDescription: "Compact 12-lead electrocardiograph with auto-interpretation and thermal printing.",
    category: "Hospital Equipment",
    categoryId: "hospital-equipment",
    features: [
      "12-lead simultaneous acquisition",
      "Auto-interpretation algorithm",
      "Large color display",
      "Thermal printer built-in",
      "Data transfer via USB/Bluetooth",
      "Pediatric-adult switchable",
    ],
    specifications: {
      "Channels": "12-lead / 6-channel simultaneous",
      "Sampling Rate": "32,000 samples/sec",
      "Display": "7-inch color LCD",
      "Printer": "Built-in thermal, 80mm paper",
      "Storage": "Up to 500 ECG records",
      "Battery": "Rechargeable Li-ion",
    },
    applications: ["Cardiology", "Emergency", "General Screening", "Pre-operative", "Sports Medicine"],
    image: "",
  },
  {
    id: "microscope",
    name: "Digital Laboratory Microscope",
    shortDescription: "Research-grade digital microscope with camera integration for pathology and diagnostics.",
    category: "Pathology & Laboratory",
    categoryId: "pathology",
    features: [
      "Trinocular head with camera port",
      "LED Köhler illumination",
      "Plan achromatic objectives",
      "Digital image capture",
      "Measurement software",
      "Ergonomic design",
    ],
    specifications: {
      "Objectives": "4×, 10×, 40×, 100× (oil)",
      "Magnification": "40×–1000×",
      "Illumination": "LED, 3W",
      "Stage": "Mechanical, 140×132mm",
      "Camera": "5MP USB (included)",
      "Software": "Image analysis & reporting",
    },
    applications: ["Pathology", "Histology", "Hematology", "Microbiology", "Research"],
    image: "",
  },
];

export const INDUSTRIES: Industry[] = [
  { name: "Hospitals", icon: "building" },
  { name: "Diagnostic Centres", icon: "scan-search" },
  { name: "Pathology Laboratories", icon: "flask-conical" },
  { name: "Radiology Centres", icon: "radio" },
  { name: "Clinics", icon: "stethoscope" },
  { name: "Medical Institutions", icon: "graduation-cap" },
  { name: "Research Laboratories", icon: "microscope" },
  { name: "Healthcare Facilities", icon: "heart-pulse" },
];

export const ADVANTAGES: Advantage[] = [
  {
    title: "Complete Solutions",
    description: "One partner for multiple healthcare requirements across radiology, pathology, equipment, and infrastructure.",
    icon: "layers",
  },
  {
    title: "Quality Focused",
    description: "Products and solutions selected with professional healthcare requirements in mind.",
    icon: "shield-check",
  },
  {
    title: "Reliable Support",
    description: "Responsive assistance throughout the purchasing and implementation journey.",
    icon: "headphones",
  },
  {
    title: "Technical Understanding",
    description: "Solutions designed around real hospital and diagnostic workflows.",
    icon: "cpu",
  },
  {
    title: "Professional Service",
    description: "A streamlined experience from enquiry to delivery and support.",
    icon: "briefcase",
  },
  {
    title: "Long-Term Partnership",
    description: "Built to support healthcare facilities beyond a single purchase.",
    icon: "handshake",
  },
];

export const PROJECT_STEPS: ProjectStep[] = [
  {
    step: "01",
    title: "Requirement",
    description: "We identify your facility's specific needs and challenges.",
  },
  {
    step: "02",
    title: "Consultation",
    description: "Our experts provide tailored recommendations and planning.",
  },
  {
    step: "03",
    title: "Product Selection",
    description: "Curated product matching with quality-assured solutions.",
  },
  {
    step: "04",
    title: "Supply",
    description: "Reliable procurement and timely delivery of all solutions.",
  },
  {
    step: "05",
    title: "Installation",
    description: "Professional setup and commissioning by trained engineers.",
  },
  {
    step: "06",
    title: "Support",
    description: "Ongoing maintenance, training, and technical assistance.",
  },
];

export const SHOWCASE_CATEGORIES = [
  "Radiology",
  "Pathology",
  "Critical Care",
  "Laboratory",
  "Hospital Equipment",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/#industries" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];
