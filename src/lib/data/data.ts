interface WaterQualityRecord {
  name: string;
  ph: number;
  dissolved_oxygen: number;
  turbidity: number;
  temperature: number;
  wqi: number;
  predicted_wqi: number;
  predicted_ph: number;
}

interface StationRecord {
  id: number;
  name: string;
  status: string;
  lastReading: string;
  wqi: number;
}

interface WqiComponent {
  name: string;
  value: number;
}

export const waterQualityData: WaterQualityRecord[] = [
  { name: 'Jan', ph: 7.2, dissolved_oxygen: 8.4, turbidity: 5.2, temperature: 16, wqi: 82, predicted_wqi: 81, predicted_ph: 7.1 },
  { name: 'Feb', ph: 7.1, dissolved_oxygen: 8.2, turbidity: 5.5, temperature: 16.5, wqi: 80, predicted_wqi: 78, predicted_ph: 7.0 },
  { name: 'Mar', ph: 7.3, dissolved_oxygen: 8.5, turbidity: 5.0, temperature: 17, wqi: 84, predicted_wqi: 83, predicted_ph: 7.2 },
  { name: 'Apr', ph: 7.0, dissolved_oxygen: 8.0, turbidity: 5.8, temperature: 18, wqi: 78, predicted_wqi: 76, predicted_ph: 6.9 },
  { name: 'May', ph: 6.9, dissolved_oxygen: 7.8, turbidity: 6.0, temperature: 19, wqi: 76, predicted_wqi: 74, predicted_ph: 6.8 },
  { name: 'Jun', ph: 7.2, dissolved_oxygen: 7.5, turbidity: 6.2, temperature: 21, wqi: 79, predicted_wqi: 77, predicted_ph: 7.0 },
];
  
export const stationData: StationRecord[] = [
  { id: 1, name: 'Station Alpha', status: 'Normal', lastReading: '10min ago', wqi: 83 },
  { id: 2, name: 'Station Beta', status: 'Warning', lastReading: '25min ago', wqi: 68 },
  { id: 3, name: 'Station Gamma', status: 'Normal', lastReading: '5min ago', wqi: 89 },
  { id: 4, name: 'Station Delta', status: 'Critical', lastReading: '1hr ago', wqi: 55 },
];

export const wqiComponents: WqiComponent[] = [
  { name: 'pH', value: 25 },
  { name: 'Dissolved Oxygen', value: 25 },
  { name: 'Turbidity', value: 25 },
  { name: 'Temperature', value: 25 },
];

export const getWqiLabel = (wqi: number): string => {
  if (wqi >= 80) return 'Excellent';
  if (wqi >= 70) return 'Good';
  if (wqi >= 60) return 'Fair';
  return 'Poor';
};