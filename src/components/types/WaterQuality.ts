
export interface WaterQualityData {
    name: string;
    ph: number;
    dissolved_oxygen: number;
    turbidity: number;
    temperature: number;
    wqi: number;
    predicted_wqi?: number;
    predicted_ph?: number;
}
  
export interface WqiComponent {
name: string;
value: number;
color: string;
}

export interface Station {
id: number;
name: string;
status: 'Normal' | 'Warning' | 'Critical';
lastReading: string;
wqi: number;
}

export interface Alert {
id: number;
title: string;
description: string;
severity: 'Warning' | 'Critical';
timestamp: string;
station: string;
}