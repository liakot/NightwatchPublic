module.exports ={
		'Cloud9 Privileges - Verify Negetive Scenario': function(client){

			var navigation = client.page.navBar();
			var loginPage = client.page.loginPage();
			var usersPage = client.page.usersPage();
			client.maximizeWindow();
			client.url(client.launch_url);
			loginPage.adminLogin(client);
			usersPage.go();
			
			usersPage.selectFirmAll(client, client.globals.adminFirm);
			usersPage.userNameSearchAll(client.globals.nonAdminUser,client);
			usersPage.selectFirstRow();
			usersPage.editAdminLevelTab();
			
			var adminPage=client.page.editAdminPage();
			//Firm Administrator 1
			adminPage.click('@adminPriv');
			client.pause(500);
			adminPage.setValue('@adminPriv','firmAdmin1');
			client.pause(500);
			adminPage.api.keys(client.Keys.ENTER);
			client.pause(500);
			adminPage.click('@tfa_No')
			adminPage.clearValue('@allowedIp')
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Allowed IP required if Two Factor Login is disabled')
			});
			client.pause(7000);
			adminPage.click('@tfa_Yes');
			client.pause(1000);
			adminPage.clearValue('@mobile')
			client.pause(1000);
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Mobile number required for two factor authentication')
			});
			client.pause(7000);
			
			//Firm Adminstrator 2
			adminPage.verify.valueContains('@adminPriv', 'string:firmAdmin1');
			client.pause(2000);
			adminPage.click('@adminPriv');
			client.pause(500);
			adminPage.setValue('@adminPriv','firmAdmin2');
			client.pause(500);
			adminPage.api.keys(client.Keys.ENTER);
			client.pause(500);
			adminPage.click('@tfa_No')
			adminPage.clearValue('@allowedIp')
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Allowed IP required if Two Factor Login is disabled')
			});
			client.pause(7000);
			adminPage.click('@tfa_Yes');
			client.pause(1000);
			adminPage.clearValue('@mobile')
			client.pause(1000);
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Mobile number required for two factor authentication')
			});
			client.pause(7000);
			//Compliance (recording access only)
			adminPage.verify.valueContains('@adminPriv', 'string:firmAdmin2');
			client.pause(2000);
			adminPage.click('@adminPriv');
			client.pause(500);
			adminPage.setValue('@adminPriv','compliance');
			client.pause(500);
			adminPage.api.keys(client.Keys.ENTER);
			client.pause(500);
			adminPage.click('@tfa_No')
			adminPage.clearValue('@allowedIp')
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Allowed IP required if Two Factor Login is disabled')
			});
			client.pause(7000);
			adminPage.click('@tfa_Yes');
			client.pause(1000);
			adminPage.clearValue('@mobile')
			client.pause(1000);
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Mobile number required for two factor authentication')
			});
			client.pause(7000);
			//User Level 3
			adminPage.verify.valueContains('@adminPriv', 'string:compliance');
			client.pause(2000);
			adminPage.click('@adminPriv');
			client.pause(500);
			adminPage.setValue('@adminPriv','userLevel3');
			client.pause(500);
			adminPage.api.keys(client.Keys.ENTER);
			client.pause(500);
			adminPage.click('@tfa_No')
			adminPage.clearValue('@allowedIp')
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Allowed IP required if Two Factor Login is disabled')
			});
			client.pause(7000);
			adminPage.click('@tfa_Yes');
			client.pause(1000);
			adminPage.clearValue('@mobile')
			client.pause(1000);
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Mobile number required for two factor authentication')
			});
			client.pause(7000);	
			//Cloud9 Sales
			adminPage.verify.valueContains('@adminPriv', 'string:user3');
			client.pause(2000);
			adminPage.click('@adminPriv');
			client.pause(500);
			adminPage.setValue('@adminPriv','cloud9Sales');
			client.pause(500);
			adminPage.api.keys(client.Keys.ENTER);
			client.pause(500);
			adminPage.click('@tfa_No')
			adminPage.clearValue('@allowedIp')
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Allowed IP required if Two Factor Login is disabled')
			});
			client.pause(7000);
			adminPage.click('@tfa_Yes');
			client.pause(1000);
			adminPage.clearValue('@mobile')
			client.pause(1000);
			adminPage.click('@saveBtn');
			client.pause(1500);	
			adminPage.getText('@toastMess',function(errorMes){
				adminPage.verify.equal(errorMes.value,'Mobile number required for two factor authentication')
			});
			client.pause(7000);
			adminPage.verify.valueContains('@adminPriv', 'string:cloud9Sales');
			client.pause(2000);
			navigation.logout();
			client.end();	
			
		}
			
	}