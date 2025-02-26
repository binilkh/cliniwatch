import { caseData } from "@/app/definitions";
import { generateYAxis } from "@/app/util";
import { formatDateToLocal } from "@/app/util";

const barLine=(caseObj:caseData, topLabel:number, range:number)=>{
  const elmnt = document?.getElementById("innerBar1");
  let graphWidth:number = 0;
  let graphSlot:number = 0;
  let yPoint:number = 0;
  let barBg:string = 'bg-blue-300';
  if(caseObj.cases > topLabel/2) {
    barBg = 'bg-orange-300';
  }
  if(elmnt) {
    graphWidth = elmnt?.offsetWidth;
    graphSlot = graphWidth/10;
    yPoint=  Math.ceil((caseObj.cases/(range*10))*(graphSlot*10));
  }
  for(var i=0; i<3;i++){
    setTimeout(function(){
      alert(i);
    }, 1000+i)
  }
  return(
    <div
    className={`w-5/6 bar rounded-md ${barBg}`}
                style={{
                  width: `${yPoint}px`,
                  height: '8px',
                }}
            ></div>
  )
}

export default function DataGraph({
  cases,
}: {
  cases: caseData[];
}) {
  const { yAxisLabels, range } = generateYAxis(cases);
  const topLabel:number = yAxisLabels.length > 0 ? Number(yAxisLabels.pop()) : 0;
  const dateTo = cases.length > 0 ? new Date(cases[0].date).toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}) : 'sd';
  const lastDate = cases.length;
  const dateFrom = cases.length > 0 ? new Date(cases[lastDate-1].date).toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}) : 'sd';
  return (
    <div className="flex h-full flex-col px-1 py-1">
      <div className="h-full rounded-md p-2 md:mr-2">
        {cases.length > 0 ? 
        <div className={`mb-4 text-xl text-sm`}>
          Recent cases from {dateFrom} To {dateTo}
        </div>
        : <div className={`mb-4 text-xl text-sm`}>
          No data available
          </div>
        }
        <div className="h-full rounded-md p-2">
        <div className="flex items-center gap-0.5 mt-2 sticky-div" id="stickyDiv">
                <div className="w-1/6 -rotate-90 text-sm text-gray-400 sm:rotate-0 pr-1"></div>
                    <div id="innerBar1" className="w-5/6 text-sm mt-0 grid grid-cols-10 items-end">
                        {(yAxisLabels.length>0) && yAxisLabels.map((labels,index)=>(
                            <div key={index}>{labels}</div>
                        ))
                        }
                    </div>
            </div>
          {(cases.length > 0) && cases.map((month) => (
            <div key={month.date} className="flex items-center gap-0.5 mt-2">
                <div className="w-1/6 text-sm text-gray-400 text-center pr-1">{formatDateToLocal(month.date)}</div>
                {barLine(month, topLabel, range)}
                <div className="info text-sm h-4 bg-violet-100 text-center">{month.cases}</div>
            </div>
            ))}
             <div className="flex items-center gap-0.5 mt-2 sticky-div-bottom" id="stickyDiv">
                <div className="w-1/6 -rotate-90 text-sm text-gray-400 sm:rotate-0 pr-1"></div>
                    <div id="innerBar2" className="w-5/6 text-sm mt-0 grid grid-cols-10 items-end">
                        {(yAxisLabels.length>0) && yAxisLabels.map((labels,index)=>(
                            <div key={index}>{labels}</div>
                        ))

                        }
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
}