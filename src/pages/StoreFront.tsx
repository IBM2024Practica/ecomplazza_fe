import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Incentives from "../components/Incentives";
import Promo from "../components/Promo";
import CategoryPreview from "../components/CategoryPreview";
import PromoSecond from "../components/PromoSecond";

export default function StoreFront() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Promo />
        <CategoryPreview />
        <PromoSecond />
        <Incentives />
        <Footer />
      </div>
    </>
  );
}
