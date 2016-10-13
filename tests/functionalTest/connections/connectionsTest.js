module.exports ={
		'@tags':['connections'],
		'Add a new Internal Connection to a new Firm': function(client){
			var loginPage = client.page.loginPage();
			client.url(client.launch_url);
			
			client.windowHandle(function(hand){
				var handle = hand.value;
				client.windowSize(handle,1700,800);
			});
			
			loginPage.adminLogin(client);
			
			var firmsPage = client.page.firmsPage();
			firmsPage.go();
			
			var dateString = firmsPage.addNewFirm(client);
			console.log('About to create: Test Firm '+dateString);
			
			var groupsPage = client.page.groupsPage();
			groupsPage.go();
			client.pause(2000);
			client.assert.urlContains('#/addGroup');
			groupsPage.addGrpForFirm(dateString,client);
			client.assert.urlContains('groups?firmId=');
			//groupsPage.addAnotherGrpForFirm(dateString,client);
			
			var usersPage = client.page.usersPage();
			usersPage.go();
			var user1 = usersPage.addUserToFirm(dateString,client);
			var connectionsPage = client.page.connectionsPage();
			connectionsPage.go();
			connectionsPage.addIntConnForFirm(dateString,client);
			
			client.assert.urlContains('#/connections');
			
			connectionsPage.editFirstRecord();
			client.assert.urlContains('#/editConnection');
			
			connectionsPage
			.verify.value('@firmNameField','Test Firm '+dateString)
			.verify.value('@commNameField', 'Financial')  //Energy
			.verify.value('@btnLabelField',dateString+'IntraFirmShout')
			.verify.valueContains('@connIdField','sPK-')
			.verify.value('@description', 'Connection within Test Firm '+dateString)
			.verify.value('@createdByField',client.globals.adminUsername);
			
			
			client.end();
		}
}