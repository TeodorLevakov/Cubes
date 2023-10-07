const fs = require('fs/promises');

const path = require('path');

const cubes = require('../db.json');

exports.save = (cube) => {
    
    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});

    return fs.writeFile(path.resolve('src','db.json'), JSON.stringify(cubes, '', 4), {encoding: 'utf-8'})
        
}

exports.getOne = (id) => cubes[id];