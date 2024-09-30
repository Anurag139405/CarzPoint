import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Product from "../../components/product";
import Footer from "../../components/footer";
import Customer from "../../components/customer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Product />
      <Customer />
      <Footer />
    </div>
  );
}
