
// This file contains the inspection data for the battery inspection app

export interface InspectionCriterion {
  id: string;
  regulationNumber: string;
  iecNumber: string;
  description: string;
  requirement: string;
  tableReference?: string;
  status: "P" | "F" | "N/A" | null;
  remarks: string;
  parentId?: string; // Reference to parent criterion
  level: number; // Hierarchy level (1, 2, 3, 4)
}

export interface InspectionTable {
  id: string;
  title: string;
  regulationNumber: string;
  criterionId: string; // Reference to the criterion this table belongs to
  samples: string[];
  columns: {
    id: string;
    title: string;
  }[];
  results: Record<string, string | null>;
  visible: boolean; // Control visibility of the table
}

export const cellInspectionCriteria: InspectionCriterion[] = [
  {
    id: "safety-req",
    regulationNumber: "2.6",
    iecNumber: "7",
    description: "YÊU CẦU VỀ ĐẶC TÍNH AN TOÀN",
    requirement: "SAFETY REQUIREMENTS",
    status: null,
    remarks: "",
    level: 1,
  },
  {
    id: "intended-use",
    regulationNumber: "2.6.1",
    iecNumber: "7.2",
    description: "SỬ DỤNG THEO DỰ KIẾN",
    requirement: "INTENDED USE",
    status: null,
    remarks: "",
    parentId: "safety-req",
    level: 2,
  },
  {
    id: "continuous-charge",
    regulationNumber: "2.6.1.1",
    iecNumber: "7.2.1",
    description: "Nạp liên tục tại điện áp không đổi (tế bào)",
    requirement: "Continuous charge at constant voltage (cells)\n\nFully charged cells are subjected for 7 days to a charge using the charging method for current and standard voltage specified by the cell manufacturer.",
    tableReference: "Table 2.6.1.1/ 7.2.1",
    status: null,
    remarks: "No fire, no explosion, no leakage",
    parentId: "intended-use",
    level: 3,
  },
  {
    id: "molded-case",
    regulationNumber: "2.6.1.2",
    iecNumber: "7.2.2",
    description: "Vỏ pin trong điều kiện sử dụng tại nhiệt độ môi trường cao",
    requirement: "Moulded case stress at high ambient temperature (battery)\n\nNo physical distortion of the battery case resulting in exposure of internal components.",
    status: null,
    remarks: "No physical distortion of the battery case resulting in exposure of internal components",
    parentId: "intended-use",
    level: 3,
  },
  {
    id: "misuse",
    regulationNumber: "2.6.2",
    iecNumber: "7.3",
    description: "SỬ DỤNG KHÔNG ĐÚNG THEO DỰ KIẾN",
    requirement: "REASONABLY FORESEEABLE MISUSE",
    status: null,
    remarks: "",
    parentId: "safety-req",
    level: 2,
  },
  {
    id: "short-circuit-cells",
    regulationNumber: "2.6.2.1",
    iecNumber: "7.3.1",
    description: "Ngắn mạch ngoài (tế bào)",
    requirement: "External short circuit (cells)\n\nShort-circuiting of the positive and negative terminals of the cell at high temperature shall not cause fire or explosion.",
    tableReference: "Table 2.6.2.1/ 7.3.1",
    status: null,
    remarks: "",
    parentId: "misuse",
    level: 3,
  },
  {
    id: "short-circuit-battery",
    regulationNumber: "2.6.2.1",
    iecNumber: "7.3.2",
    description: "Ngắn mạch ngoài (pin)",
    requirement: "External short circuit (battery)\n\nShort-circuiting of the positive and negative terminals of the battery shall not cause fire or explosion.",
    tableReference: "Table 2.6.2.1/ 7.3.2",
    status: null,
    remarks: "",
    parentId: "misuse",
    level: 3,
  },
  {
    id: "free-fall",
    regulationNumber: "2.6.2.2",
    iecNumber: "7.3.3",
    description: "Rơi tự do (pin/tế bào)",
    requirement: "Free fall (battery/cells)\n\nDropping a cell or battery shall not cause fire or explosion.",
    status: null,
    remarks: "No fire, no explosion",
    parentId: "misuse",
    level: 3,
  },
  {
    id: "thermal-abuse",
    regulationNumber: "2.6.2.3",
    iecNumber: "7.3.4",
    description: "Quá nhiệt (tế bào)",
    requirement: "Thermal abuse (cells)\n\nAn extremely high temperature shall not cause fire or explosion",
    tableReference: "Table 2.6.2.3/ 7.3.4",
    status: null,
    remarks: "130°C\nNo fire, no explosion",
    parentId: "misuse",
    level: 3,
  },
  {
    id: "crush",
    regulationNumber: "2.6.2.4",
    iecNumber: "7.3.5",
    description: "Ép bẹp (tế bào)",
    requirement: "Crush (Cells)",
    tableReference: "Table 2.6.2.4/ 7.3.5",
    status: null,
    remarks: "",
    parentId: "misuse",
    level: 3,
  },
  {
    id: "forced-discharge",
    regulationNumber: "2.6.2.6",
    iecNumber: "7.3.7",
    description: "Xả điện cưỡng bức (tế bào)",
    requirement: "Forced discharge (cells)",
    tableReference: "Table 2.6.2.6/ 7.3.7",
    status: null,
    remarks: "",
    parentId: "misuse",
    level: 3,
  },
];

export const inspectionTables: InspectionTable[] = [
  {
    id: "continuous-charge-table",
    title: "Continuous charge at constant voltage (cells)",
    regulationNumber: "2.6.1.1/ 7.2.1",
    criterionId: "continuous-charge", // Link to the criterion
    samples: ["C#01", "C#02", "C#03", "C#04", "C#05"],
    columns: [
      { id: "model", title: "Model" },
      { id: "chargingVoltage", title: "Recommended charging voltage Vc (Vdc)" },
      { id: "chargingCurrent", title: "Recommended charging current Irec (mA)" },
      { id: "ocvStart", title: "OCV at start of test, (Vdc)" },
      { id: "results", title: "Results" },
    ],
    results: {},
    visible: false,
  },
  {
    id: "external-short-circuit-table",
    title: "External short circuit (Cell)",
    regulationNumber: "2.6.2.1/ 7.3.1",
    criterionId: "short-circuit-cells", // Link to the criterion
    samples: ["C#06", "C#07", "C#08", "C#09", "C#10", "C#11", "C#12", "C#13", "C#14", "C#15"],
    columns: [
      { id: "sample", title: "Sample" },
      { id: "ambient", title: "Ambient, (°C)" },
      { id: "ocvStart", title: "OCV at start of test, (Vdc)" },
      { id: "resistance", title: "Resistance of circuit, (mΩ)" },
      { id: "maxTemp", title: "Maximum case temperature (°C)" },
      { id: "results", title: "Results" },
    ],
    results: {},
    visible: false,
  },
  {
    id: "free-fall-table",
    title: "Free Fall (cells)",
    regulationNumber: "2.6.2.2/ 7.3.3",
    criterionId: "free-fall", // Link to the criterion
    samples: ["C#16", "C#17", "C#18"],
    columns: [
      { id: "sample", title: "Sample" },
      { id: "ambient", title: "Ambient, (°C)" },
      { id: "results", title: "Results" },
    ],
    results: {},
    visible: false,
  },
  {
    id: "thermal-abuse-table",
    title: "Thermal abuse (cells)",
    regulationNumber: "2.6.2.3/ 7.3.4",
    criterionId: "thermal-abuse", // Link to the criterion
    samples: ["C#19", "C#20", "C#21", "C#22", "C#23", "C#24", "C#25", "C#26", "C#27", "C#28"],
    columns: [
      { id: "model", title: "Model" },
      { id: "upperlimit", title: "(Samples charged at charging temperature upper limit)" },
      { id: "resultsUpper", title: "Results" },
      { id: "lowerlimit", title: "(Samples charged at charging temperature lower limit)" },
      { id: "resultsLower", title: "Results" },
    ],
    results: {},
    visible: false,
  },
  {
    id: "crush-table",
    title: "Crush (Cells)",
    regulationNumber: "2.6.2.4/ 7.3.5",
    criterionId: "crush", // Link to the criterion
    samples: ["C#29", "C#30", "C#31", "C#32", "C#33", "C#34", "C#35", "C#36", "C#37", "C#38"],
    columns: [
      { id: "sample", title: "Sample" },
      { id: "ocvStart", title: "OCV at start of test, (Vdc)" },
      { id: "ocvRemoval", title: "OCV at removal of crushing force, (Vdc)" },
      { id: "maxForce", title: "Maximum force applied to the cell during crush, (kN)" },
      { id: "results", title: "Results" },
    ],
    results: {},
    visible: false,
  },
  {
    id: "forced-discharge-table",
    title: "Forced discharge (cells)",
    regulationNumber: "2.6.2.6/ 7.3.7",
    criterionId: "forced-discharge", // Link to the criterion
    samples: ["C#39", "C#40", "C#41", "C#42", "C#43"],
    columns: [
      { id: "model", title: "Model" },
      { id: "ocvBefore", title: "OCV before application of reverse charge, (Vdc)" },
      { id: "measuredCharge", title: "Measured reverse charge I, (mA)" },
      { id: "lowerLimit", title: "Lower limit discharge voltage (Vdc)" },
      { id: "results", title: "Results" },
    ],
    results: {},
    visible: false,
  },
];

// Helper function to determine status of a criterion based on test table results
export const determineTestTableStatus = (table: InspectionTable): "P" | "F" | "N/A" | null => {
  const resultValues = Object.values(table.results);
  
  // If no results, return null
  if (resultValues.length === 0) return null;
  
  // Check if all values are N/A
  if (resultValues.every(value => value === "N/A")) return "N/A";
  
  // Check if any value is F
  if (resultValues.some(value => value === "F")) return "F";
  
  // If all values are either P or N/A and at least one P
  if (resultValues.every(value => value === "P" || value === "N/A") && 
      resultValues.some(value => value === "P")) {
    return "P";
  }
  
  // Default case if there are some results but not complete
  return null;
};

// Function to determine parent status based on children statuses
export const determineParentStatus = (childrenStatuses: Array<"P" | "F" | "N/A" | null>): "P" | "F" | "N/A" | null => {
  // Filter out null values
  const validStatuses = childrenStatuses.filter(status => status !== null) as Array<"P" | "F" | "N/A">;
  
  // If no valid statuses, return null
  if (validStatuses.length === 0) return null;
  
  // Check if all children are N/A
  if (validStatuses.every(status => status === "N/A")) return "N/A";
  
  // Check if any child is F
  if (validStatuses.some(status => status === "F")) return "F";
  
  // If all children are either P or N/A, and at least one is P
  if (validStatuses.every(status => status === "P" || status === "N/A") && 
      validStatuses.some(status => status === "P")) {
    return "P";
  }
  
  // Default case
  return null;
};
