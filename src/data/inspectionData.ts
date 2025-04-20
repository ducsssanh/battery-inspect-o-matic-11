import { InspectionCriterion, InspectionTable } from "@/types";

// Mock template data for different product types
const productTemplates = {
  computers: {
    criteria: [
      {
        id: "c1",
        title: "Safety Requirements",
        description: "Safety requirements for computer hardware",
        level: 1,
        parentId: null,
        status: null
      },
      {
        id: "c1-1",
        title: "Electrical Safety",
        description: "Electrical safety standards compliance",
        level: 2,
        parentId: "c1",
        status: null
      },
      {
        id: "c1-1-1",
        title: "Power Supply Safety",
        description: "Power supply unit safety requirements",
        level: 3,
        parentId: "c1-1",
        status: null
      },
      {
        id: "c1-1-2",
        title: "Battery Safety",
        description: "Battery safety and certification",
        level: 3,
        parentId: "c1-1",
        status: null
      },
      {
        id: "c1-2",
        title: "Thermal Safety",
        description: "Thermal emission and cooling systems",
        level: 2,
        parentId: "c1",
        status: null
      },
      {
        id: "c2",
        title: "Performance Requirements",
        description: "Performance requirements for computer hardware",
        level: 1,
        parentId: null,
        status: null
      },
      {
        id: "c2-1",
        title: "Processing Speed",
        description: "CPU performance metrics",
        level: 2,
        parentId: "c2",
        status: null
      },
      {
        id: "c2-2",
        title: "Memory Performance",
        description: "RAM and storage performance",
        level: 2,
        parentId: "c2",
        status: null
      }
    ],
    tables: [
      {
        id: "table1",
        title: "Power Supply Unit Voltage Testing",
        regulationNumber: "EN 62368-1",
        criterionId: "c1-1-1",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "voltage", title: "Voltage (V)" },
          { id: "current", title: "Current (A)" }
        ],
        samples: ["Sample A", "Sample B", "Sample C"],
        results: {}
      },
      {
        id: "table2",
        title: "Battery Charge Cycle Testing",
        regulationNumber: "IEC 62133",
        criterionId: "c1-1-2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "cycles", title: "Cycles" },
          { id: "capacity", title: "Capacity (%)" }
        ],
        samples: ["Battery 1", "Battery 2", "Battery 3"],
        results: {}
      },
      {
        id: "table3",
        title: "Thermal Performance Under Load",
        regulationNumber: "ASTM D4851",
        criterionId: "c1-2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "idle_temp", title: "Idle Temp (°C)" },
          { id: "load_temp", title: "Load Temp (°C)" }
        ],
        samples: ["Unit 1", "Unit 2", "Unit 3"],
        results: {}
      },
      {
        id: "table4",
        title: "CPU Performance Benchmarks",
        regulationNumber: "TPC-C",
        criterionId: "c2-1",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "single_thread", title: "Single Thread" },
          { id: "multi_thread", title: "Multi Thread" }
        ],
        samples: ["CPU Test 1", "CPU Test 2", "CPU Test 3"],
        results: {}
      }
    ]
  },
  phones: {
    criteria: [
      {
        id: "p1",
        title: "Mobile Device Standards",
        description: "Standards for mobile devices",
        level: 1,
        parentId: null,
        status: null
      },
      {
        id: "p1-1",
        title: "RF Emissions",
        description: "Radio frequency emission standards",
        level: 2,
        parentId: "p1",
        status: null
      },
      {
        id: "p1-2",
        title: "Display Quality",
        description: "Screen quality requirements",
        level: 2,
        parentId: "p1",
        status: null
      },
      {
        id: "p2",
        title: "Battery Performance",
        description: "Battery life and charging standards",
        level: 1,
        parentId: null,
        status: null
      }
    ],
    tables: [
      {
        id: "table1",
        title: "RF Emission Testing",
        regulationNumber: "FCC Part 15",
        criterionId: "p1-1",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "sae", title: "SAE (W/kg)" },
          { id: "distance", title: "Distance (cm)" }
        ],
        samples: ["Device A", "Device B", "Device C"],
        results: {}
      },
      {
        id: "table2",
        title: "Display Brightness and Color Accuracy",
        regulationNumber: "Display P3",
        criterionId: "p1-2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "nits", title: "Brightness (nits)" },
          { id: "srgb", title: "sRGB Coverage (%)" }
        ],
        samples: ["Screen 1", "Screen 2", "Screen 3"],
        results: {}
      },
      {
        id: "table3",
        title: "Battery Life Testing",
        regulationNumber: "IEEE 1725",
        criterionId: "p2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "runtime", title: "Runtime (h)" },
          { id: "charge_time", title: "Charge Time (min)" }
        ],
        samples: ["Battery A", "Battery B", "Battery C"],
        results: {}
      }
    ]
  },
  batteries: {
    criteria: [
      {
        id: "b1",
        title: "Battery Safety Standards",
        description: "Safety standards for batteries",
        level: 1,
        parentId: null,
        status: null
      },
      {
        id: "b1-1",
        title: "Thermal Runaway Prevention",
        description: "Thermal runaway testing",
        level: 2,
        parentId: "b1",
        status: null
      },
      {
        id: "b1-2",
        title: "Short Circuit Protection",
        description: "Short circuit protection testing",
        level: 2,
        parentId: "b1",
        status: null
      },
      {
        id: "b2",
        title: "Performance Standards",
        description: "Performance standards for batteries",
        level: 1,
        parentId: null,
        status: null
      }
    ],
    tables: [
      {
        id: "table1",
        title: "Thermal Runaway Test",
        regulationNumber: "UL 1642",
        criterionId: "b1-1",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "max_temp", title: "Max Temp (°C)" },
          { id: "time_to_max", title: "Time to Max (s)" }
        ],
        samples: ["Cell A", "Cell B", "Cell C"],
        results: {}
      },
      {
        id: "table2",
        title: "Short Circuit Protection Test",
        regulationNumber: "IEC 62133-2",
        criterionId: "b1-2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "resistance", title: "Resistance (Ω)" },
          { id: "current", title: "Current (A)" }
        ],
        samples: ["Protection 1", "Protection 2", "Protection 3"],
        results: {}
      },
      {
        id: "table3",
        title: "Cycle Life Testing",
        regulationNumber: "ANSI C18.2M",
        criterionId: "b2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "cycles", title: "Cycles" },
          { id: "capacity_loss", title: "Capacity Loss (%)" }
        ],
        samples: ["Battery A", "Battery B", "Battery C"],
        results: {}
      }
    ]
  },
  tablets: {
    criteria: [
      {
        id: "t1",
        title: "Tablet Standards",
        description: "Standards for tablet devices",
        level: 1,
        parentId: null,
        status: null
      },
      {
        id: "t1-1",
        title: "Touch Screen Accuracy",
        description: "Touch input accuracy testing",
        level: 2,
        parentId: "t1",
        status: null
      },
      {
        id: "t1-2",
        title: "Display Quality",
        description: "Screen quality requirements",
        level: 2,
        parentId: "t1",
        status: null
      }
    ],
    tables: [
      {
        id: "table1",
        title: "Touch Input Accuracy Test",
        regulationNumber: "ISO/IEC 17025",
        criterionId: "t1-1",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "accuracy", title: "Accuracy (mm)" },
          { id: "response", title: "Response (ms)" }
        ],
        samples: ["Tablet A", "Tablet B", "Tablet C"],
        results: {}
      },
      {
        id: "table2",
        title: "Display Color Accuracy",
        regulationNumber: "DisplayHDR 600",
        criterionId: "t1-2",
        visible: true,
        columns: [
          { id: "sample", title: "Sample" },
          { id: "delta_e", title: "Delta E" },
          { id: "gamut", title: "Color Gamut (%)" }
        ],
        samples: ["Display 1", "Display 2", "Display 3"],
        results: {}
      }
    ]
  }
};

// Function to fetch product templates - simulates API call
export const fetchProductTemplates = (productType: string): Promise<{
  criteria: InspectionCriterion[],
  tables: InspectionTable[]
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const template = productTemplates[productType as keyof typeof productTemplates];
      
      if (template) {
        resolve(template);
      } else {
        reject(new Error(`No template found for product type: ${productType}`));
      }
    }, 500); // Simulate network delay
  });
};

// Export existing data for backwards compatibility
export const cellInspectionCriteria: InspectionCriterion[] = productTemplates.computers.criteria;
export const inspectionTables: InspectionTable[] = productTemplates.computers.tables;

export const determineTestTableStatus = (table: InspectionTable): "P" | "F" | "N/A" | null => {
  const totalSamples = table.samples.length;
  if (totalSamples === 0) return null;

  let passCount = 0;
  let failCount = 0;

  table.samples.forEach(sample => {
    const resultKey = `${sample}-results`;
    const result = table.results[resultKey];

    if (result === "P") {
      passCount++;
    } else if (result === "F") {
      failCount++;
    }
  });

  if (failCount > 0) {
    return "F";
  } else if (passCount === totalSamples) {
    return "P";
  } else if (passCount > 0 || failCount === 0) {
    return "N/A";
  }

  return null;
};

export const determineParentStatus = (childrenStatuses: (string | null | undefined)[]): "P" | "F" | "N/A" | null => {
  if (!childrenStatuses || childrenStatuses.length === 0) {
    return null;
  }

  let hasPass = false;
  let hasFail = false;
  let hasNA = false;

  childrenStatuses.forEach(status => {
    if (status === "P") {
      hasPass = true;
    } else if (status === "F") {
      hasFail = true;
    } else if (status === "N/A") {
      hasNA = true;
    }
  });

  if (hasFail) {
    return "F";
  } else if (hasNA && !hasPass) {
    return "N/A";
  } else if (hasPass && !hasFail) {
    return "P";
  } else {
    return "N/A";
  }
};
