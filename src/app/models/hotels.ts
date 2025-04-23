export interface Hotel {
    hotel_id: number;
    hotel_name: string;
    city: string;
    review_score: number;
    review_score_word: string;
    min_total_price: number;
    is_free_cancellable: number;
    checkin: {
      from: string;
      until: string;
    };
    checkout: {
      from: string;
      until: string;
    };
    composite_price_breakdown: CompositePriceBreakdown;
    main_photo_url: string;
  }
  
  export interface CompositePriceBreakdown {
    gross_amount: Amount;
    net_amount: Amount;
    all_inclusive_amount: Amount;
    gross_amount_hotel_currency: Amount;
    discounted_amount: Amount;
    strikethrough_amount: Amount;
    items: BreakdownItem[];
  }
  
  export interface Amount {
    value: number;
    currency: string;
    amount_rounded: string;
    amount_unrounded: string;
  }
  
  export interface BreakdownItem {
    name: string;
    kind: string;
    details: string;
    item_amount: Amount;
    inclusion_type?: string;
    base?: {
      kind: string;
      percentage?: number;
    };
  }

  export interface HotelApiResponse {
    data: {
      result: Hotel[];
    };
  }
  
  