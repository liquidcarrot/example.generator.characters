// number_of_pixels is
/**
 * copies the source image to the target image but add an alpha channel
 * @param  {[type]} source_image_data        Array-like
 * @param  {[type]} target_image_data        Array-like, must have proper length (source_length/3*4)
 * @param  {positive int} [number_of_pixels=32*32] Equivalent to width * height
 * @param  {nonnegative int} [start_index=0]         Starting index in source
 * @return {undefined}                          [description]
 */
const copyWithAlpha = function (source_image_data, target_image_data, {
  number_of_pixels = 32*32, start_index = 0,
} = {}) {
  if (!source_image_data || !target_image_data) {
    console.error('both source and target images are required');
  }

  // in the following formulas, it is considered that source image data has RGB while out has RGBA
  // note that source_length === number_of_pixels * 3
  if (source_image_data.length - start_index < number_of_pixels * 3) {
    console.log('source_image_data.length - start_index: ', source_image_data.length - start_index);
    console.log('number_of_pixels * 3: ', number_of_pixels * 3);
    console.error('the source image is smaller than the required number of bytes to copy (hint: check number_of_pixels, start_index, and source_image_data.length)');
    return;
  }
  if (number_of_pixels * 4 > target_image_data.length) {
    console.log('number_of_pixels * 4: ', number_of_pixels * 4);
    console.log('target_image_data.length: ', target_image_data.length);
    console.error('the target image is too small to hold the source image with alpha channel (hint: check number_of_pixels and target_image_data.length)');
    return;
  }

  let source_image_offset = 0;
  for (let i = 0; i < number_of_pixels * 4; i += 4, source_image_offset += 3) {
    // Modify pixel data
    target_image_data[i + 0] = source_image_data[start_index + source_image_offset + 0];  // R value
    target_image_data[i + 1] = source_image_data[start_index + source_image_offset + 1];  // G value
    target_image_data[i + 2] = source_image_data[start_index + source_image_offset + 2];  // B value
    target_image_data[i + 3] = 255;  // A value
  }
}
