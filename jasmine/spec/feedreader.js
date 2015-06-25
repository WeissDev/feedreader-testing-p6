/** feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/** We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /** This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /** This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /** Checks if every feed has a url defined */
        it('all feeds have url defined and not empty', function() {
            /** Loop through each feed */
            for(var i = 0; i < allFeeds.length; i++) {
                /** Every feed must have an url */
                expect(allFeeds[i].url).toBeDefined();
                /** and it should not be empty */
                expect(allFeeds[i].url).not.toBe('');
            }
        });


         /** Checks if every feed has a name (title) defined */
        it('all feeds have a name defined and not empty', function() {
            /** Same as before, loop through each feed */
            for (var i = 0; i < allFeeds.length; i++) {
                /** Check if they have a name defined */
                expect(allFeeds[i].name).toBeDefined();
                /** Should not be empty */
                expect(allFeeds[i].name).not.toBe('');
            };
        });
    });

    /** Test suite for the menu navigation */
    describe('The menu', function() {
        /** The sidebar menu navigation should be hidden by default */
        it('menu is hidden by default', function() {
            /** Checks if body has the .menu-hidden class */
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /** Menu should fade in/out on click, this test checks for visibility */
        it('menu should change visibility on click', function() {
            /** Menu is hidden by default so */
            $('.menu-icon-link').click();
            /** on clicking the icon the .menu-hidden class should dissappear */
            expect($('body').hasClass('menu-hidden')).toEqual(false);

            /** Now the menu is visible
             * on clicking the icon once again
             */
            $('.menu-icon-link').click();
            /** .menu-hidden class should be should reappear on icon element */
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    /** Test suite for all the initial entries */
    describe('Initial Entries', function() {
        /** This test ensures that when the loadFeed is called it executes properly
         * It checks whether or not there is a least a single .entry element in the .feed container
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should contain at least a single .entry element in .feed container', function() {
            /** Checks if number of entries is > 0 */
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /** Test suite for the New Feed Selection */
    describe('New Feed Selection', function() {
        /** This test ensures that a new feed is loaded and that the content changes
         * The variable oldContent saves the previous .feed content
         * which is then used to check whether it is equal or not to the new content that has loaded
         */
        var oldContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldContent = $('.feed').html();
                loadFeed(1, done);
            });
        });
        /** The content of .feed should not be equal to oldContent */
        it('should change content when new feed is loaded', function() {
            expect($('.feed').html()).not.toBe(oldContent);
        });
    });
}());
