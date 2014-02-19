function hoppyPeople( body, appendTo ) {

    var binder = new dataBinder();

    people = {
        // keep a track of how many people there are
        persons: {},
        count: 0,
        active: 0,
        minY: 150,
        maxY: 400,

        create: function() {
            // get next person id
            this.persons[ this.count ] = [];
            var target = [];
            // set some defaults properties for the person
            target.height = 5;
            target.currentX = Math.floor(Math.random() * 600) + 1;
            target.multiplier = (Math.floor(Math.random() * 300) / 1000 ) + 1;
            target.currentY = this.maxY; 
            target.direction = 'down';
            target.type = 'totoro';
            target.view = document.createElement( 'div' );
            target.view.innerHTML = "<div id='person" + this.count + "' class='person' style='position:absolute'>"
            + "<img src='resources/totoro.gif' />"
            + "</div>";
            this.persons[ this.count ] = target;
            this.active = this.count;
            // render
            document.getElementById( appendTo ).appendChild( target.view );
            setInterval( this.render.bind( this, this.count ), 1 );
            // up the count
            this.count++;
            // add new person to the select list for editing
            body.addOption( 'active_person', 'Person' + this.count, this.count );
        },

        render: function( tar ) {
            var target = document.getElementById( 'person' + tar );
            var values = this.persons[ tar ];
            // set x & y
            target.style.top = values.currentY + 'px';
            target.style.left = values.currentX + 'px';
            // since we're jumping increment y
            if ( values.currentY < this.maxY && values.direction === 'down' ) {
                values.currentY++;
            } else if ( values.currentY > this.minY && values.direction === 'up' ){
                values.currentY = values.currentY - values.multiplier;
            } else if ( values.currentY >= this.maxY && values.direction === 'down' ) {
                values.direction = 'up';
            } else if ( values.currentY <= this.maxY && values.direction === 'up' ) {
                values.direction = 'down';
            }
        },

        update: function(tar, property, value) {
            this.persons[ tar ][ property ] = value; 
        }

    };

    binder.on( 'people:change', function( evt, attr_name, new_val, initiator ) {
        console.log( evt, attr_name, new_val, initiator );
        if ( attr_name === 'active' ) {
            // strip person from value
            var personNum = new_val.replace( 'Person', '' );

            // set new active
            people.active = personNum;

            // update display
            body.updateElement(
                'multiplier',
                'value',
                ( people.persons[ ( people.active - 1 ) ].multiplier * 10 )
            );
        } else if ( attr_name === 'multiplier' ) {
            // update the multiplier and we divid by 10 so people
            // don't have to deal with fractions
            people.persons[ ( people.active - 1 ) ].multiplier = new_val/10;
        } else if ( attr_name === 'type' ) {
            // changing type means we need to query for a new tempalte.
            // request the new html
            var html = body.getTemplate(
                'templates/' + new_val + ".html",
                { 'count':  ( people.active - 1 ) }
            );
            // now append to the object that
            var target = document.getElementById( 'person' + ( people.active - 1 ) ).parentNode;
            target.innerHTML = html;
            people.persons[ ( people.active - 1 ) ].type = new_val;
        }
    });

   return people; 
}
