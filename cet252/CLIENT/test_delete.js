import { Selector } from 'testcafe';

fixture('testing delete movie endpoint')
    .page('http://localhost:4000/')
     .beforeEach(async t => {
        await t.setNativeDialogHandler(() => true); //accepting the delete!
    });

test('testing delete movie endpoint', async t => {
    await t
    .wait(1500)    
    .typeText('#searchInput','watchmen') 
    .wait(1500)
    .click('#searchBtn')
    .wait(2000)
      //clicking on delete btn!
    .click('#movieGrid > div > div > div > div > div > div.col-md-7 > div > div > button.btn.btn-danger.w-100.mb-2.text-center')//clicking on edit btn
     .wait(2000)
 
     //declaring an object to get alert history!
     const popUp = await t.getNativeDialogHistory();


     //creating an object to access the alert dialog!
     const dialog = popUp.find(d=> d.type === 'alert');

     //since the confirmation regarding delete is auto accepted test waits only for the dialog!
     //expected message!
     await t
     .expect(dialog).ok()
     .expect(dialog.text).eql('Movie has been deleted with success');//expected message!
});