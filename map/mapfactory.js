function MapFactory()
{
    this.maps = [];
    this.maps.push(SearchMap); // Simple random map
    this.maps.push(BspMap); // BSP rogue-like map
    this.maps.push(MazeMap);

    this.getMap = function(cols, rows, x, y, w, h, allowDiagonals, percentWalls)
    {
        if(this.maps.length == 0) return undefined;

        var selected = floor(random(this.maps.length));
        return new this.maps[selected](cols, rows, x, y, w, h, allowDiagonals, percentWalls);
    }
}
