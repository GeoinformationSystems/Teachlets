function ANT(loc){
	this.direction = Math.floor( (Math.floor(1 + (Math.random() * 100)) / 25)); // 0-3
	this.loc = loc;
}

ANT.prototype.isAnt = function(loc){
	if((this.loc.col == loc.col) && (this.loc.row == loc.row)) 
		return true;
	
	return false;
}

ANT.prototype.isValidDirection = function(maxrows,maxcols){
	var checker = true;
	switch(this.direction) {
		case 0:
			//up
			if((this.loc.row - 1) < 0) checker = false;
			break;
		case 1:
			//right
			if((this.loc.col + 1) > maxcols) checker = false;
			break;
		case 2:
			//down
			if((this.loc.row + 1) > maxrows) checker = false;
			break;
		case 3:
			//left
			if((this.loc.col - 1) < 0) checker = false;
			break;
	}

	if(checker == true){
		switch(this.direction) {
			case 0:
				this.loc.row = this.loc.row - 1;
				break;
			case 1:
				//right
				this.loc.col = this.loc.col + 1;
				break;
			case 2:
				//down
				this.loc.row = this.loc.row + 1;
				break;
			case 3:
				//left
				this.loc.col = this.loc.col - 1;
				break;
		}
		return true;
	} else {
		this.direction+=1;
		if(this.direction > 3)
			this.direction = 0;
		
		return false;
	}
}	

ANT.prototype.goAnt = function(app){
	if(app.getRasterDataValue(this.loc) == 0){
		//weis
		app.setRasterDataValue(this.loc,1);
		this.direction+=1;
		if(this.direction > 3)
			this.direction = 0;
	} else {
		//schwarz
		app.setRasterDataValue(this.loc,0);
		this.direction-=1;
		if(this.direction < 0) 
			this.direction = 3;
	}
	var checkedDirection = false;
	while(checkedDirection === false){
		checkedDirection = this.isValidDirection(app.rows-1 ,app.cols-1);
	}
}