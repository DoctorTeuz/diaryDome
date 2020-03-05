import { Injectable } from '@angular/core';
import { ContestGenerateService } from './contest-generate.service';
import { GeneralFunctionService } from '../general-function.service';

@Injectable({
  providedIn: 'root'
})
export class MatchGenerateService {

  constructor(
	  public contestGenerator: ContestGenerateService,
	  public GFService: GeneralFunctionService,
  ) { }

  matchStyleShort(segment, format){

    let soldOutColor = format.soldOutColor;
    let color1 = format.matchFirstBorderColor;
    let color2 = format.matchSecondBorderColor;

    let finalString = "";
    finalString = "<div style='width: 100%; text-align: left; border-width: 0px; background-color: rgba(0,0,0,0); " +
                  "'><b><u><font color='" + soldOutColor +"'>MATCH</font></u></b> - ";
  
    if(segment.championship){
      finalString = finalString + '<b>' + segment.championship + ' Championship</b><br>';
    }
    finalString = finalString + segment.matchType + ': <i>' + segment.matchScheme + '</i>';
  
    if(segment.content){
      finalString = finalString + '<br>' + segment.content;
    }
    finalString = finalString + '<br><u><b>';
    finalString = finalString + '';
    if(!segment.matchWinner){
      finalString = finalString + 'No Contest</b></i></u>';
    }
    else{
      if(!segment.championship){
        finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '</i>';
      }
      else{
        if(segment.titleChange){
          finalString = finalString + 'Winner and new ' + segment.championship + 
                        ' Champion</b></u>: ' + segment.matchWinner + '</i>';
        }
        else{
          if(!segment.championshipAdv){
            finalString = finalString + 'Winner and still ' + segment.championship + 
                          ' Champion</b></u>: ' + segment.matchWinner + '</i>';
          }
          else{
            finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '<br><b>But still ' + segment.championship + 
                          ' Champion</b></u>: ' + segment.champion + '</i>';
          }
        } 
      }
    }
  
    finalString = finalString + '</div>';
    return finalString;
  }
  
   matchStyle1(segment, format){
		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' + 
					'text-align: left; border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
					'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class="" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker =  !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + 
							this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + 
									segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';

		return finalString;
	} 

	matchStyle2(segment, format){
		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; ' + 
					'height: auto;text-align: left;border: 0px;background: none;font-style: normal; ' + 
					'text-align: justify; " align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class="" align="center" style="border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + 
								this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center><br>';
		finalString = finalString + segment.content + '</div>';
		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto; text-align: right; border: 0px; ' + 
					'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
													' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
										'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';

		return finalString;
	}

	matchStyle3(segment, format){
		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' +
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class="" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px;">';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';

		return finalString;
	}

	matchStyle4(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


	let finalString = "";
	finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
					'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
					'align="left"><b>';

	if(segment.championship){
		finalString = finalString + segment.championship + " Championship<br>";
	}
		
	finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

	finalString = finalString + '<div class="" align="center" style="border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px;">';

	finalString = finalString + segment.content + '</div>';

	finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right; border: 0px; ' + 
				'background: none;font-style: normal" align="right"><i><b>';
	if(!segment.matchWinner){
		finalString = finalString + 'No Contest</b></i>';
	}
	else{
		if( !segment.championship){
			finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
		}
		else{
			if(segment.titleChange){
				finalString = finalString + 'Winner and new ' + segment.championship + 
							' Champion</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(!segment.championshipAdv){
					finalString = finalString + 'Winner and still ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
								'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
				}
			} 
		}
	}
	finalString = finalString + '</div></div>';

	return finalString;
}

	matchStyle5(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; '
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; ' + 
						'border-radius: 20px; border:none; font-style: normal; text-align: justify; padding: 9px; ' + 
						'border-style: solid; border-width: 2px; border-color: ' + color1 + ';"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + 
							this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' +
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';

		return finalString;
	}

	matchStyle6(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; ' + 
					'border-color: ' + color1 + ';"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + 
						this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right; border: 0px; ' + 
					'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
						' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
										'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}
		finalString = finalString + '</div></div>';
		return finalString;
	}

	matchStyle7(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
					'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
					'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; ' + 
					'border-radius: 20px; border:none; font-style: normal; text-align: justify; padding: 9px; ' + 
					'border-style: solid; border-width: 2px; border-color: ' + color1 + ';">';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right; border: 0px; ' + 
					'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}
		finalString = finalString + '</div></div>';

		return finalString;
	}

	matchStyle8(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' + 
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; ' + 
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; ' + 
						'border-width: 2px; border-color: ' + color1 + ';">';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right; border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
										'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
	}

	matchStyle9(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' + 
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; ' + 
					'border-radius: 20px; border:none; font-style: normal; text-align: justify; padding: 9px; ' + 
					'border-style: solid; border-width: 2px; border-color: ' + color1 + ';">';

		finalString = finalString + '<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; ' + 
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; ' + 
						'border-color: ' + color2 + '; margin-left: 30px; margin-right: 30px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center></div><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto; text-align: right; border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
	}

	matchStyle10(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' + 
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; ' + 
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; ' + 
						'border-color: ' + color1 + ';">';

		finalString = finalString + '<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; ' +
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; ' + 
						'border-color: ' + color2 + '; margin-left: 30px; margin-right: 30px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center></div><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
	}

	matchStyle11(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
						'text-align: left;border: 0px;background: none;font-style: normal; ' + 
						'text-align: justify; " align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; ' + 
						'border-radius: 20px; border:none; font-style: normal; text-align: justify; padding: 9px;">';

		finalString = finalString + '<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; ' + 
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; ' + 
						'border-width: 2px; border-color: ' + color2 + '; margin-left: 20px; margin-right: 20px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center></div><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
}

	matchStyle12(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;


		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; ' + 
						'height: auto;text-align: left;border: 0px;background: none;font-style: normal; ' + 
						'text-align: justify; " align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; ' + 
					'font-style: normal; text-align: justify; padding: 9px;">';

		finalString = finalString + '<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; ' + 
						'font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; ' + 
						'border-color: ' + color2 + '; margin-left: 20px; margin-right: 20px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center></div><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
							'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
										'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
}


	matchStyle13(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = "";
		finalString = finalString + '<div style="width:100%;"><center>';

		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}

		if(segment.championship){
			finalString = finalString + '<br><b>' + segment.championship + ' Championship</b>';
		}
		finalString = finalString + "<br>" + segment.matchType + '<br><u>' + segment.matchScheme + '</u>';
		finalString = finalString + '</center>';

		finalString = finalString + segment.content + '<br><u><b>';

		finalString = finalString + '';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i></u>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
							' Champion</b></u>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
								' Champion</b></u>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + 
								'<br><b>But still ' + segment.championship + ' Champion</b></u>: ' + segment.champion + '</i>';
					}
				} 
			}
		}


		return finalString + '</div>';
	}

	matchStyle14(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = '<div style="width:100%;">';
		
		if(segment.championship){
			finalString = finalString + '<b>' + segment.championship + ' Championship</b><br>';
		}
		finalString = finalString + segment.matchType + '<br><u>' + segment.matchScheme + '</u><br>';
		//finalString = finalString + '</center><br>';

		finalString = finalString + segment.content + '<br><u><b>';

		finalString = finalString + '';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i></u>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b></u>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
									' Champion</b></u>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b></u>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		return finalString + '</div>';
	}

	matchStyle15(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;

		let finalString = '<div style="width:100%;">';
		finalString = "<b><u><font color='" + soldOutColor + "'>MATCH</font></u></b> - ";
		if(segment.championship){
			finalString = finalString + '<b>' + segment.championship + ' Championship</b><br>';
		}
		finalString = finalString + segment.matchType + ': <i>' + segment.matchScheme + '</i>';

		finalString = finalString + '<br><u><b>';

		finalString = finalString + '';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i></u>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
								' Champion</b></u>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
									' Champion</b></u>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + 
									'<br><b>But still ' + segment.championship + ' Champion</b></u>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		return finalString + '</div>';
	}

	matchStyle16(segment, format){

		let soldOutColor = format.soldOutColor;
		let color1 = format.matchFirstBorderColor;
		if(segment.segmentType == 'SpecialMatch'){
			color1 = segment.graphicColor;
		}
		let color2 = format.matchSecondBorderColor;
		let fontColor = this.GFService.analyzeBGColor(color1);

		let finalString = "";
		finalString = finalString + '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' +
						'text-align: left;border: 0px;background: none;font-style: normal; text-align: justify;" ' +
						'align="left"><b>';

		if(segment.championship){
			finalString = finalString + segment.championship + " Championship<br>";
		}
			
		finalString = finalString + segment.matchType + "</b><br><i>" + segment.matchScheme + "</i></div>";

		finalString = finalString + '<div class="" align="center" style="background-color:' + color1 + '; border-radius: 20px; ' + 
						'border:none; color: ' + fontColor + '; font-style: normal; text-align: justify; padding: 9px;"><center>';

		if(segment.championship){
			finalString = finalString + this.GFService.findTitle(segment.championship, segment.showId);
		}
		if(segment.matchWorkers){
			let matchWorker = !segment.matchWorkers ? [] : segment.matchWorkers.split("|");
			for(let j=0; j<matchWorker.length; j++){
				finalString = finalString + this.GFService.createWorkerImageStyle(matchWorker[j], format.workerImageShape, segment.showId, soldOutColor);
			}
		}
		finalString = finalString + '</center><br>';

		finalString = finalString + segment.content + '</div>';

		finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px; ' + 
						'background: none;font-style: normal" align="right"><i><b>';
		if(!segment.matchWinner){
			finalString = finalString + 'No Contest</b></i>';
		}
		else{
			if( !segment.championship){
				finalString = finalString + 'Winner</b>: ' + segment.matchWinner + '</i>';
			}
			else{
				if(segment.titleChange){
					finalString = finalString + 'Winner and new ' + segment.championship + 
									' Champion</b>: ' + segment.matchWinner + '</i>';
				}
				else{
					if(!segment.championshipAdv){
						finalString = finalString + 'Winner and still ' + segment.championship + 
										' Champion</b>: ' + segment.matchWinner + '</i>';
					}
					else{
						finalString = finalString + 'Winner</b>: ' + segment.matchWinner + 
										'<br><b>But still ' + segment.championship + ' Champion</b>: ' + segment.champion + '</i>';
					}
				} 
			}
		}

		finalString = finalString + '</div></div>';
		return finalString;
	}
}
