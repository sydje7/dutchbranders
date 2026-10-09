import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cursussen bestaan niet meer: oude links sturen we door naar de diensten
  async redirects() {
    return [
      { source: "/cursussen", destination: "/diensten", permanent: true },
      { source: "/:lang(nl|en)/cursussen", destination: "/:lang/diensten", permanent: true },
    ];
  },
};

export default nextConfig;
