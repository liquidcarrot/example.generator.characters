
function startApp() {
  // load the dataset and call onLoad afterward
  images_dataset.loadImages(onLoad);
}

let iteration_counter_component = new Vue({
  el: '#iteration-counter',
  data: {
    iteration_number: 0,
  },
});

let app_component = new Vue({
  el: '#app',
  data: {
    loaded: false,
    },
  methods: {
    previousImage,
    nextImage,
    startTraining,
    generateImage,
    /*changecolor() {
      this.dicks = "green";
    }*/
  }
});

let images_dataset = new ImageDataset();

// here we can draw to the canvas
let drawer_real;
let drawer_generated;

let db_index = 0;
// after images have loaded
function onLoad() {
  app_component.loaded = true;

  console.log('done');

  // get the two canvases to be able to draw to them
  drawer_real = new Drawer('canvas-real-images');
  drawer_generated = new Drawer('canvas-generated-images');

  // draw an example image into the dataset
  drawer_real.drawImage(images_dataset.getImage(db_index));
}

// goes to the previous image in the real images canvas
function previousImage() {
  db_index--;
  if (db_index < 0) {
    db_index = images_dataset.getNumberOfImages() - 1;
  }
  drawer_real.drawImage(images_dataset.getImage(db_index));
}

// goes to the next image in the real images canvas
function nextImage() {
  db_index++;
  var num_imgs = images_dataset.getNumberOfImages();
  if (db_index >= num_imgs) {
    db_index = 0;
  }

  drawer_real.drawImage(images_dataset.getImage(db_index));
}


// start training creates network and trains them
let generator_network;
let discriminator_network;
function startTraining() {
  // generator network:
  // 10 inputs (random numbers) -> 3072 outputs (32*32*3)
  // discriminator network:
  // 3072 inputs -> 1 output (how likely to be real)
  generator_network = new carrot.Network(10, 3072);
  discriminator_network = new carrot.Network(3072, 1);

  // generate some images using random numbers
  let random_generator_input = Array(10);
  for (let i = 0; i < 10; i++) random_generator_input[i] = Math.random();
  let generator_out = generator_network.activate(random_generator_input);

  // mix them between the real images

  // teach the discriminator network

  // repeat

}

// generate image generates an image. the networks must have been created before
function generateImage() {
  // check that the generator network has been created
  if (!generator_network) {
    console.error('The generator network has not been created');
    return;
  }

  // generate some images using random numbers
  let random_generator_input = Array(10);
  for (let i = 0; i < 10; i++) random_generator_input[i] = Math.random();
  // for (let i = 0; i < 10; i++) random_generator_input[i] = 0;
  let generator_out = generator_network.activate(random_generator_input);

  // images have bytes so convert to 0-255
  generator_out = generator_out.map((val) => Math.round(val*255));

  // prepare image to display
  const generated_image_ready = new Uint8ClampedArray(generator_out.length / 3 * 4);
  copyWithAlpha(generator_out, generated_image_ready);

  // draw image
  drawer_generated.drawImage(generated_image_ready);
}

startApp();


/* Import hdf5 dataset straight up. Probably bad idea though
fetch(file_url) // the hdf5 file
 .then(function(response) {
   return response.arrayBuffer()
 })
 .then(function(buffer) {
   var f = new hdf5.File(buffer, filename);
   // do something with f;
   // let g = f.get('group');
   // let d = f.get('group/dataset');
   // let v = d.value;
   // let a = d.attrs;
 });
 */
