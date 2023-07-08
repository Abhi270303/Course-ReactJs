import Faq from "../Faq/Faq";
import Courses from "../Courses/Courses";
import WhyUs from "../WhyUs/WhyUs";
const Home = ({ fakeData, addToCart, cart, unitPrice }) => {
  return (
    <>
      
      <WhyUs />
      <Courses
        addToCart={addToCart}
        cart={cart}
        unitPrice={unitPrice}
        courseList={fakeData}
      />
      
    </>
  )
};

export default Home;
