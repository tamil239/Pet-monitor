export interface SensorData {
  temperature: string;
  heartRate: string;
  rfid: string;
  rfidStatus: string;
  rfidActive: boolean;
  healthStatus?: string;
  signalStrength?: number;
}

export interface FoodPreferences {
  type: 'veg' | 'non-veg' | 'both';
  favoriteFoods: string[];
  unsuitableFoods: string[];
  feedingSchedule: string;
}

export interface HealthGuidelines {
  suitableTemperature: string;
  exerciseNeeds: string;
  groomingNeeds: string;
  specialCare: string[];
}

export interface MedicalHistory {
  vaccinations: string[];
  allergies: string[];
  medications: string[];
}

export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  age: string;
  owner: string;
  weight: string;
  lastCheckup: string;
  favoriteThings: string[];
  foodPreferences: FoodPreferences;
  healthGuidelines: HealthGuidelines;
  medicalHistory: MedicalHistory;
}

export interface HealthReading {
  time: string;
  heartRate: string;
  temperature: string;
  status: 'normal' | 'warning' | 'danger' | 'measuring';
}
