import { Activity } from "./activities";
import { ItineraryDay } from "./itineraries";

export interface Vacation{
    id: number;
    budget: number;
    country: string;
    days: number;
    startingDate: string; 
    endingDate: string;   
    travelCompanion: 'SOLO' | 'COUPLE' | 'FAMILY' | 'FRIENDS'; 
    activityList: Activity[];
    itineraryDayList: ItineraryDay[];
}