import { caseData } from "@/app/definitions"
export const generateYAxis = (revenue: caseData[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels:string[] = [];
    let topLabel = 0;
        if(revenue.length > 0) {
            
            const highestRecord = Math.max(...revenue.map((month) => month.cases));
            const multiplier = Math.ceil(highestRecord/10);
            topLabel = Math.ceil(highestRecord / multiplier) * multiplier;
            const range:number = findRange(topLabel);
            for (let i = 0; i <=range*10; i += range) {
            yAxisLabels.push(`${i}`);
        }
        
        return { yAxisLabels, topLabel, range };
        } else {
            const range = findRange(topLabel);
            return { yAxisLabels, topLabel, range };
        }
    
  };

  export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    let options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
    };
    if(window.innerWidth >= 768) {
      options = {
        day: 'numeric',
        month: 'short',
      };
    }
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  const findRange=(max:number) =>{
    let count = 0;
    let baseRange=0;
    let findDigits = max;
    if (findDigits >= 1) ++count;
    while (findDigits / 10 >= 1) {
      findDigits /= 10;
      ++count;
    }
    const baseComp:number = 10 ** (count-1);
    const range:number = 10 ** (count-2);
    if(max<=10){
      baseRange=1;
    }else{
      const maxDiv: number = max/baseComp;
      baseRange=maxDiv*range+range;
    }
    return Math.ceil(baseRange);
  }