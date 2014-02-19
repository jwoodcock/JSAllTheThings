function hoppyPeople( body, appendTo ) {

    people = {
        // keep a track of how many people there are
        attributes: {},
        count: 0,
        active: 0,
        minY: 150,
        maxY: 400,

        create: function() {
            // get next person id
            this.attributes[ this.count ] = [];
            var target = this.attributes[ this.count ];
            // set some defaults
            target.height = 5;
            target.currentX = Math.floor(Math.random() * 600) + 1;
            target.multiplier = (Math.floor(Math.random() * 300) / 1000 ) + 1;
            target.currentY = this.maxY; 
            target.direction = 'down';
            target.view = "<div id='person" + this.count + "' class='person' style='position:absolute'>"
            + "<img src='resources/sadam_up.gif' />"
            + "</div>";
            this.active = this.count;
            // render
            document.getElementById( appendTo ).innerHTML += this.attributes[ this.active ].view;
            setInterval( this.render.bind( this ), 1, this.count );
            // up the count
            this.count++;
        },

        render: function( tar ) {
            var target = document.getElementById( 'person' + tar );
            var values = this.attributes[ tar ];
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
            this.attributes[ tar ][ property ] = value; 
        }

    };

   return people; 
}
