import { Selector } from 'testcafe';

fixture('Testing read')
    .page('http://localhost:4000/');

test('Testing read route', async t => {
    await t
         .wait(2000)
        .typeText('#searchInput', 'Die Hard')//searching die hard movie on the search input!
        .wait(2000)
        .click('#searchBtn')//clicking search button!
        .wait(2000)
        //expecting director's name to be displayed on the card John McTiernan!
        .expect(Selector('#movieGrid > div > div > div > div > div > div.col-md-7 > div > p:nth-child(4)').innerText).eql('Director: John McTiernan')
        .wait(1500);
});