import _ from 'underscore'


const doc = document,
  navi = navigator;


export function getNearbyCoordsFrom(coords, proximity = 0.000003) {
  coords.latitude += (proximity * _.random(-9, 9));
  coords.longitude += (proximity * _.random(-9, 9));
  return coords;
}

export function addFruitsNearby(fruits, coords, scene) {
  // if(navi.onLine !== true) { // offline fruits catalog
    fruits = _.shuffle(fruits).slice(0, _.random(0, fruits.length - 1))
  
  // }
  fruits.forEach((item) => {
    let node = doc.createElement('a-entity');
    // node.setAttribute('gltf-model', '#' + item.slug);
    // node.setAttribute('id', 'fruit-' + crypto.uuid());
    node.setAttribute('gltf-model', '#' + item);
    node.object3D.scale.set(0.15, 0.15, 0.15);
    
    node.setAttribute('gps-new-entity-place', getNearbyCoordsFrom(coords))
    node.setAttribute('pickable', null)
    node.setAttribute('points', 5)
    node.setAttribute('obb-collider', null);
    
    
    scene.appendChild(node)
  })
  return fruits.length;
}