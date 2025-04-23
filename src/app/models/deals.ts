export interface Deal { 
    link: string; image: string; label?: string; description: string; title?: string; active?: boolean;
}
  
export interface Section {
    title: string;
    deals: Deal[];
  }
  