module.exports ={
		'Cloud9 Portal Smoke Test - Recordings': function(client){
			var navigation = client.page.navBar();
			var loginPage = client.page.loginPage();
			var usersPage = client.page.usersPage();
			client.windowHandle(function(hand){
				var handle = hand.value;
				client.windowSize(handle,1700,800);
			});
			client.url(client.launch_url);
						
			
			loginPage.userLogin(client);
			
			//Recordings Tab
			var recordingsPage = client.page.recordingsPage();
			recordingsPage.portalRecordingsTab(client);
			recordingsPage.click('@recordingsTab');
			client.elements('xpath','//*[@id="scrollable-area"]/table/tbody/tr',function(result){
				client.verify.notEqual(result.value.length, 25, 'There should be less than 25 groups on this page');
			});
			client.assert.urlContains('#/recordings');
			recordingsPage.api.pause(2000);

			
			console.log('Test cases Countinuing')
			client.closeWindow();
			client.end();
			
		},
		
}