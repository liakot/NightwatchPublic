var firmsPageCommands = {
		go: function(){
			this.api.pause(1000);
			this.verify.visible('@HomeLink', 'Verified Firms tab button is visible');
			this.click('@HomeLink');
			this.api.pause(1000);
		},
		addNewFirm : function(client){
			this.assert.containsText('body','Add Firm');
			this.waitForElementVisible('@RemoteNameForAdd',2000);
			
			var now = new Date();
			var dateString=now.getFullYear().toString()+
			(now.getMonth()+1<10 ? '0'+(now.getMonth()+1).toString() : (now.getMonth()+1).toString())+''+
			(now.getDate()<10 ? '0'+now.getDate().toString() : now.getDate().toString())+''+
			(now.getHours()<10 ? '0'+now.getHours().toString() : now.getHours().toString())+''+
			(now.getMinutes()<10 ? '0'+now.getMinutes().toString() : now.getMinutes().toString())+''+
			(now.getSeconds()<10 ? '0'+now.getSeconds().toString() : now.getSeconds().toString())+''+
			(now.getMilliseconds()<10?'00'+now.getMilliseconds().toString():(now.getMilliseconds()<100?'0'+now.getMilliseconds().toString():now.getMilliseconds().toString()));
	
			
			this.setValue('@RemoteNameForAdd','Test Firm '+dateString)
			.setValue('@street1', '123 Main Street')
			.setValue('@street2', '17th Flr')
			.setValue('@city', 'Any City')
			.setValue('@zip', 12345)
			.setValue('@pfname','Erique')
			.setValue('@plname','Martinez')
			.setValue('@pemail',client.globals.email1)
			.setValue('@pwork', 123456789)
			.setValue('@pmobile',234567890)
			.click('@firmType')
			.click('@firmVisible');
			
			this.api.pause(1000);
			this.click('@countryDropdown');
			this.api.pause(1000);
			this.setValue('@countrySearch','United States');
			this.api.pause(1000);
			this.api.keys(client.Keys.ENTER);
			this.api.pause(1000);
			
			this.click('@stateDropdown');
			this.click('@stateSearch');
			this.api.pause(500);
			this.setValue('@stateSearch','New York');
			this.api.pause(500);
			this.api.keys(client.Keys.ENTER);	
			this.click('@copyFrmBtn');
			this.api.pause(1000);
			return dateString.trim();
		},
		addEditSubmitBtn:function(){
			this.verify.visible('@submitFrmBtn', 'Verified Firm Submit button is visible');
			this.click('@submitFrmBtn');
			this.api.pause(500);
		},
		addEditSubToastMess:function(){
			this.api.pause(1500);
			this.getText('@toastMess',function(errorMes){
				this.verify.equal(errorMes.value,'Firm added successfully.')
			});
			this.api.pause(7000);			
		},
		addEditSubUpToastMess:function(){
			this.api.pause(1500);
			this.getText('@toastMess',function(errorMes){
				this.verify.equal(errorMes.value,'Firm updated successfully.')
			});
			this.api.pause(7000);			
		},
		street2:function(){
			this.verify.visible('@street2', 'Verified Street2 Input Field is visible');
			this.clearValue('@street2');
			this.setValue('@street2', '17th floor');
			this.api.pause(1000);
		},
		
		
};

module.exports = {
		commands :[firmsPageCommands],
		elements: {	
			RemoteNameSearch:{
				selector: '//*[@id="scrollable-area"]/table/thead[1]/tr[2]/th[1]/div/input',
				locateStrategy: 'xpath'
			},
			RemoteNameForAdd: {
				selector: '//*[@id="name"]',
				locateStrategy: 'xpath'
			},
			street1 : 'input[name=street1]',
			street2 : 'input[name=street2]',
			city : 'input[name=city]',
			zip: 'input[name=zip',
			pfname: 'input[name=provisionerFirstName]',
			plname: 'input[name=provisionerLastName]',
			pemail: 'input[name=provisionerEmail]',
			pwork: 'input[name=work]',
			pmobile: 'input[name=mobile]',
			firmType: 'select[name=firmType]',
			
			billFname: 'input[name=billFirst]',
			billLname: 'input[name=billLast]',
			billEmail: 'input[name=billEmail]',
			billWork: 'input[name=billWork]',
			billMobile: 'input[name=billMobile]',
			billStr1: 'input[name=billStreet1]',
			billStr2: 'input[name=billStreet2]',
			billCity: 'input[name=billCity]',
			billState: 'input[name=billState]',
			billZip: 'input[name=billZip]',
			copyFrmBtn: '#copyfirm',
			
			submitFrmBtn: {
				selector: '//*[@id="firmData"]/div[2]/button[2]',
				locateStrategy: 'xpath'
			},
			
			firstRowFirmsData:{
				selector: '//*[@id="scrollable-area"]/table/tbody/tr/td[1]',
				locateStrategy: 'xpath'
			},
			
			okButton:{
				selector: "(//button[@type='button'])[4]",
				locateStrategy: 'xpath'
			},
			
			countryDropdown:{
				selector: '//*[@id="mailingCountry_chosen"]',
				locateStrategy: 'xpath'
			},
			countrySearch: {
				selector: '//*[@id="mailingCountry_chosen"]/div/div/input',
				locateStrategy: 'xpath'
			},
			stateDropdown:{
				selector: '//*[@id="mailingState_chosen"]',
				locateStrategy: 'xpath'
			},
			stateSearch: {
				selector: '//*[@id="mailingState_chosen"]/div/div/input',
				locateStrategy: 'xpath'
			},
			country: {
				selector: '//*[@id="mailingCountry"]',
				locateStrategy: 'xpath'
			},
			state: {
				selector: '//*[@id="mailingState"]',
				locateStrategy: 'xpath'
			},
			billCountry: {
				selector: '//*[@id="billCountry"]',
				locateStrategy: 'xpath'
			},
			billState: {
				selector: '//*[@id="billState"]',
				locateStrategy: 'xpath'
			},		
			detailsFirmID:{
				selector: '//span[contains(.,"Firm ID")]',
				locateStrategy: 'xpath'
			},
			detailsRemoteName:{
				selector: '//*[@id="scrollable-area"]/table/thead[1]/tr[1]/th[1]/div/span',
				locateStrategy: 'xpath'
			},
			firmVisible: {
				selector: '//*[@id="firmType"]/option[2]',
				locateStrategy:'xpath'
			},
			countryUSA: {
				selector: '//*[@id="mailingCountry_chosen"]/div/ul/li[231]',
				locateStrategy:'xpath'
			},
			toastMess: {
				selector: '//*[@id="toast-container"]/div/div',
				locateStrategy:'xpath'
			}
		
		
		}
}