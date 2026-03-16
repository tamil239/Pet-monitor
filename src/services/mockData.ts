import { PetProfile, HealthReading } from '../types';

export const petDatabase: Record<string, PetProfile> = {
  'A1B2C3D4': { 
    id: 'A1B2C3D4',
    name: 'Max', 
    breed: 'Golden Retriever', 
    age: '3 years', 
    owner: 'John Doe',
    weight: '32 kg',
    lastCheckup: '2024-12-15',
    favoriteThings: ['Playing fetch', 'Swimming', 'Car rides', 'Chew toys'],
    foodPreferences: {
      type: 'non-veg',
      favoriteFoods: ['Chicken', 'Salmon', 'Sweet potatoes', 'Carrots'],
      unsuitableFoods: ['Chocolate', 'Grapes', 'Onions', 'Avocado'],
      feedingSchedule: 'Twice daily - 8:00 AM & 6:00 PM'
    },
    healthGuidelines: {
      suitableTemperature: '18-24°C',
      exerciseNeeds: '60 minutes daily',
      groomingNeeds: 'Brush 3 times weekly, bath monthly',
      specialCare: ['Regular hip checkups', 'Dental cleaning every 6 months']
    },
    medicalHistory: {
      vaccinations: ['Rabies', 'Distemper', 'Parvovirus', 'Leptospirosis'],
      allergies: ['Pollen', 'Certain flea medications'],
      medications: ['Heartworm preventive monthly']
    }
  },
  'E5F6G7H8': { 
    id: 'E5F6G7H8',
    name: 'Luna', 
    breed: 'Siamese Cat', 
    age: '2 years', 
    owner: 'Jane Smith',
    weight: '4.5 kg',
    lastCheckup: '2024-11-20',
    favoriteThings: ['Laser pointer', 'Catnip toys', 'High perches', 'Blankets'],
    foodPreferences: {
      type: 'non-veg',
      favoriteFoods: ['Tuna', 'Chicken', 'Salmon treats'],
      unsuitableFoods: ['Dairy products', 'Raw fish', 'Onions'],
      feedingSchedule: 'Small portions 4 times daily'
    },
    healthGuidelines: {
      suitableTemperature: '20-26°C',
      exerciseNeeds: '30 minutes daily play',
      groomingNeeds: 'Weekly brushing, nail trim monthly',
      specialCare: ['Regular dental care', 'Keep indoors only']
    },
    medicalHistory: {
      vaccinations: ['Rabies', 'Feline distemper', 'Calicivirus'],
      allergies: ['Dust', 'Certain cleaning products'],
      medications: ['Flea treatment monthly']
    }
  },
  'I9J0K1L2': { 
    id: 'I9J0K1L2',
    name: 'Rocky', 
    breed: 'German Shepherd', 
    age: '5 years', 
    owner: 'Mike Johnson',
    weight: '38 kg',
    lastCheckup: '2024-12-01',
    favoriteThings: ['Running', 'Training sessions', 'Puzzle toys', 'Socializing'],
    foodPreferences: {
      type: 'both',
      favoriteFoods: ['Beef', 'Rice', 'Green beans', 'Apples'],
      unsuitableFoods: ['Chocolate', 'Macadamia nuts', 'Yeast dough'],
      feedingSchedule: 'Twice daily - 7:00 AM & 7:00 PM'
    },
    healthGuidelines: {
      suitableTemperature: '15-22°C',
      exerciseNeeds: '90 minutes daily with mental stimulation',
      groomingNeeds: 'Brush daily during shedding, bath every 2 months',
      specialCare: ['Hip and elbow monitoring', 'Regular training reinforcement']
    },
    medicalHistory: {
      vaccinations: ['Rabies', 'Distemper', 'Parvovirus', 'Bordetella'],
      allergies: ['Grass', 'Some chicken products'],
      medications: ['Joint supplements', 'Monthly preventives']
    }
  }
};

export const healthHistory: HealthReading[] = [
  { time: '10:30 AM', heartRate: '72', temperature: '38.2', status: 'normal' },
  { time: '10:00 AM', heartRate: '75', temperature: '38.1', status: 'normal' },
  { time: '09:30 AM', heartRate: '70', temperature: '38.3', status: 'normal' },
  { time: '09:00 AM', heartRate: '68', temperature: '38.0', status: 'normal' },
];
