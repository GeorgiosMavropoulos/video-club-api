import { Selector } from 'testcafe';

fixture('testing POST endpoint through client')
    .page('http://localhost:4000/')
     .beforeEach(async t => {
        await t.setNativeDialogHandler(() => true); //auto accepting the alert!
    });

test('testing POST endpoint through client', async t => {
    await t
         .click('#addMovieBtn')//clicking on add movie btn!
         .wait(2000)//adding a bit delay since testcafe is as rapid  as a rocket!
         .click(Selector('#category_id'))//clicking on selector to select a category!
         .click(Selector('#category_id option').withAttribute('value', '3')) //clicking action!
         .wait(1000)//adding a bit delay since testcafe is as rapid  as a rocket!
         .typeText('#image','/uploads/watchmen.jpeg')//adding the image's path!
         .wait(1200)//adding a bit delay since testcafe is as rapid  as a rocket!
         .typeText('#title','Watchmen')//adding movie's title!
         .wait(1000)//delay time!
         .typeText('#director','Zack Snyder')//director's name!
         .wait(1000)
         .typeText('#date','2009')//release date!
         .wait(1000)
         .typeText('#plot','In a version of 1985 where superheroes exist, the murder of a colleague sends active vigilante Rorschach on the trail of a conspiracy that will change the course of history.')

         .wait(1000)
         .typeText('#genre','Action')
         .wait(1000)
         .click('#add_movie_form > div.d-grid.gap-2.mt-4 > button')//clicking add movie
       
         //create a variable to get alert history!
         const popUp = await t.getNativeDialogHistory();

         //expected alert msg!
         await t
         .expect(popUp[0].type).eql('alert')
         .expect(popUp[0].text).eql('Success movie added');


});