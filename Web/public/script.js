// Gladly.CSS function reused from one of my earlier projects
$(function gladlyCSS(){
    
    $('#main').addClass('fadingin1sec');
    
    $(function loadNewSwatches() {
        
        // Choose two high RGB values and two low RGB values to create a set of colors that fall in the same color family
        var hirgb1 = Math.floor(Math.random() * 50) + 180;
        var hirgb2 = Math.floor(Math.random() * 50) + 180;
        var lorgb1 = Math.floor(Math.random() * 150) + 40;
        var lorgb2 = Math.floor(Math.random() * 150) + 40;    
        var crayonindex = 0; 
        var crayon = [
            'rgba(' + hirgb1 + ', ' + lorgb1 + ', ' + lorgb2 + ', 1)', // red
            'rgba(' + hirgb1 + ', ' + lorgb1 + ', ' + hirgb2 + ', 1)', // purple
            'rgba(' + lorgb1 + ', ' + lorgb2 + ', ' + hirgb1 + ', 1)', // blue
            'rgba(' + lorgb1 + ', ' + hirgb1 + ', ' + hirgb2 + ', 1)', // cyan
            'rgba(' + lorgb1 + ', ' + hirgb1 + ', ' + lorgb2 + ', 1)', // green
            'rgba(' + hirgb1 + ', ' + hirgb2 + ', ' + lorgb1 + ', 1)', // yellow
            'rgba(' + hirgb1 + ', ' + hirgb1 + ', ' + hirgb1 + ', 1)' // gray     
        ]
        makeTheGradient();
        
        // Get a random gradient when you click anywhere on the page. Fun + helpful for testing but can be removed.
        // What needs to be implemented: Incoming variable called RGB from Azure Table determines the index of crayon array.
        $('html').on('click', makeTheGradient);  
        
        function makeTheGradient() {
            // Generate a second color that complements the selected color
            var gradientindex = Math.floor(Math.random() * 7);
            var crayonalt = [
                'rgba(' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb2 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Red
                'rgba(' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb2 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Purple
                'rgba(' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb2 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Blue
                'rgba(' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb2 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Cyan
                'rgba(' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb2 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Green
                'rgba(' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb2 + Math.floor(Math.random() * 200) - 100) + ', ' + (lorgb1 + Math.floor(Math.random() * 200) - 100) + ', 1)', // Yellow
                'rgba(' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', ' + (hirgb1 + Math.floor(Math.random() * 200) - 100) + ', 1)' // Light gray
                ] 
 
            // In the unusual event that the two gradient colors are the same, reset the second one to white
            if (crayon[gradientindex] == crayonalt[gradientindex]) { crayonalt[gradientindex] = 'rgba(0, 0, 0, 1)' }
                
            // This actually draws the gradient to the background
            $('body').css('background', 'linear-gradient(135deg, ' + crayon[gradientindex] + ', ' + crayonalt[gradientindex] + ')');  
            
        }
    });
});