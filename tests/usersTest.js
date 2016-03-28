module.exports ={
		'@tags':['user'],
		
		'Add a New User to a new Firm': function(client){
			var loginPage = client.page.loginPage();
			client.url(client.globals.baseUrl);
			loginPage.adminLogin(client);
			
			var firmsPage = client.page.firmsPage();
			firmsPage.go();
			
			var dateString = firmsPage.addNewFirm(client);
			console.log('About to create: Test Firm '+dateString);
			
			var groupsPage = client.page.groupsPage();
			groupsPage.go();
			client.assert.urlContains('#/groups');
			groupsPage.addGrpForFirm(dateString,client);
			client.assert.urlContains('firmId=');
			//groupsPage.addAnotherGrpForFirm(dateString,client);
			
			var usersPage = client.page.usersPage();
			usersPage.go();
			var user1 = usersPage.addUserToFirm(dateString,client);
			var userGroupsPage= client.page.editUserGroupsPage();
			userGroupsPage
			.verify.urlContains('#/editUserGroups')
			.done();
			client.assert.urlContains('firmId=')
			usersPage.editFirstRecord();
			
			client.verify.urlContains('#/editUser');
			
			usersPage
			.verify.valueContains('@firmName', 'Test Firm '+dateString)
			.verify.valueContains('@username','johndoe'+user1)
			.verify.valueContains('@fnameField','John')
			.verify.valueContains('@lnameField','Doe'+user1)
			.verify.valueContains('@emailField',client.globals.email1)
			.verify.valueContains('@workField',123456789)
			.verify.valueContains('@mobileField',234567890)
			.verify.valueContains('@voiceYes',1)
			.verify.urlContains('#/editUser?firmId=')
			
			client.end();
		},
		
		'Edit a newly added user': function(client){
			var loginPage = client.page.loginPage();
			client.url(client.globals.baseUrl);
			loginPage.adminLogin(client);
			
			var firmsPage = client.page.firmsPage();
			firmsPage.go();
			
			var dateString = firmsPage.addNewFirm(client);
			console.log('About to create: Test Firm '+dateString);
			
			var groupsPage = client.page.groupsPage();
			groupsPage.go();
			client.assert.urlContains('#/groups');
			groupsPage.addGrpForFirm(dateString,client);
			client.assert.urlContains('firmId=');
			//groupsPage.addAnotherGrpForFirm(dateString,client);
			
			var usersPage = client.page.usersPage();
			usersPage.go();
			var user1 = usersPage.addUserToFirm(dateString,client);
			var userGroupsPage= client.page.editUserGroupsPage();
			userGroupsPage
			.verify.urlContains('#/editUserGroups')
			.done();
			client.assert.urlContains('firmId=')
			//usersPage.editFirstRecord();
			usersPage.updateFirstRecord(user1);
			
			//client.verify.urlContains('#/editUser');
			
			usersPage.editFirstRecord();
			
			usersPage
			.verify.valueContains('@firmName', 'Test Firm '+dateString)
			.verify.valueContains('@username','johndoe'+user1)
			.verify.valueContains('@fnameField','Jane')
			.verify.valueContains('@lnameField','Poe'+user1)
			.verify.valueContains('@emailField','updateduser@c9tec.com')
			.verify.valueContains('@workField','011-234-5294')
			.verify.valueContains('@mobileField','011-234-5555')
			.verify.valueContains('@voiceNo',0)
			.verify.urlContains('#/editUser')
			
			client.end();
		},
		
		'Delete a newly added user': function(client){
			var loginPage = client.page.loginPage();
			client.url(client.globals.baseUrl);
			loginPage.adminLogin(client);
			
			var firmsPage = client.page.firmsPage();
			firmsPage.go();
			
			var dateString = firmsPage.addNewFirm(client);
			console.log('About to create: Test Firm '+dateString);
			
			var groupsPage = client.page.groupsPage();
			groupsPage.go();
			client.assert.urlContains('#/groups');
			groupsPage.addGrpForFirm(dateString,client);
			client.assert.urlContains('firmId=');
			
			var usersPage = client.page.usersPage();
			usersPage.go();
			var user1 = usersPage.addUserToFirm(dateString,client);
			var userGroupsPage= client.page.editUserGroupsPage();
			userGroupsPage
			.verify.urlContains('#/editUserGroups')
			.done();
			client.assert.urlContains('firmId=')
			usersPage.deleteUser(user1,client);
			
			usersPage.editRecord();
			
			usersPage
			.verify.valueContains('@firmName', 'Limbo Accounts')
			.verify.valueContains('@username','johndoe'+user1+'deleted2016')
			.verify.valueContains('@fnameField','John')
			.verify.valueContains('@lnameField','Doe'+user1)
			.verify.valueContains('@emailField',client.globals.email1)
			.verify.valueContains('@workField',123456789)
			.verify.valueContains('@mobileField',234567890)
			.verify.valueContains('@voiceNo',0)
			.verify.urlContains('#/editUser')
			
			client.end();
		},
		
		
		'Edit Sales Info for a new user': function(client){
			var loginPage = client.page.loginPage();
			client.url(client.globals.baseUrl);
			loginPage.adminLogin(client);
			
			var firmsPage = client.page.firmsPage();
			firmsPage.go();
			
			var dateString = firmsPage.addNewFirm(client);
			console.log('About to create: Test Firm '+dateString);
			
			var groupsPage = client.page.groupsPage();
			groupsPage.go();
			client.assert.urlContains('#/groups');
			groupsPage.addGrpForFirm(dateString,client);
			client.verify.urlContains('firmId=');
			
			var usersPage = client.page.usersPage();
			usersPage.go();
			var user1 = usersPage.addUserToFirm(dateString,client);
			var userGroupsPage= client.page.editUserGroupsPage();
			userGroupsPage
			.verify.urlContains('#/editUserGroups')
			.done();
			var salesPage =client.page.editSalesInfoPage();
			usersPage.editSalesInfo();
			
			salesPage
			.verify.containsText('body','Edit Sales Info for johndoe'+user1)
			.verify.valueContains('@firmName','Test Firm '+dateString)
			.verify.valueContains('@firstName','John')
			.verify.valueContains('@lastName','Doe'+user1)
			
			.cancelSalesInfo();
			salesPage.verify.urlContains('/#/editSalesInfo?firmId=');
			
			salesPage.getValue('@salesPerson1Bar',function(result){
				salesPage.verify.equal(result.value,'None')
			});
			salesPage.getValue('@salesPerson2Bar',function(result){
				salesPage.verify.equal(result.value,'None')
			});
			/**/
			salesPage.getValue('@billStartBar',function(result){
				salesPage.verify.equal(result.value,'string:')
			});
			salesPage.getValue('@billStopBar',function(result){
				salesPage.verify.equal(result.value,'string:')
			});
			
			//should not save while "Bill Start Date" is "Trial"
			salesPage
			.saveSalesInfo()
			salesPage.waitForElementVisible('@error1',2000);
			salesPage.getText('@error1',function(result){
				salesPage.verify.equal(result.value,'Unable to change sales Info.\nsalesPerson is missing')
			});
			
			client.verify.urlContains('#/editSalesInfo?firmId=');
			
			client.end();
		}
}