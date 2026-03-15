/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',  // Google profile pictures
      'res.cloudinary.com'          // Cloudinary images (already used in your code)
    ],
  },
};

export default nextConfig;
