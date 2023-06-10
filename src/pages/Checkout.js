import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number } from "yup";
import { useFormik } from "formik";
import { config } from "../utils/base_url";
import axios from "axios";

const shippingSchema = object({
  firstName: string().required("Enter First Name"),
  lastName: string().required("Enter Last Name"),
  address: string().required("Address details are required"),
  city: string().required("City is required"),
  state: string().required("State is required"),
  country: string().required("Country is required"),
  postcode: number().required("PostCode is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.userCart);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
    },
  });

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };
  // const hanndleCheckout = async () => {
  //   const res = await loadScript("https://checkout.flutterwave.com/v3.js");

  //   // Initialize payment form
  //   var paymentForm = window.flutterwave({
  //     public_key: process.env.FLW_PUBLIC_KEY,
  //     tx_ref: "hooli-tx-1920bbtyt",
  //     amount: 2000,
  //     currency: "NGN",
  //     payment_options: "card,mobilemoney,ussd",
  //     redirect_url: "https://localhost:4000/api/user/order/checkout",
  //     meta: {
  //       consumer_id: 23,
  //       consumer_mac: "92a3-912ba-1192a",
  //     },
  //     customer: {
  //       email: "user@gmail.com",
  //       phone_number: "+2348131089335",
  //       name: "Yemi Desola",
  //     },
  //     callback: function (data) {
  //       console.log(data);
  //     },
  //     onclose: function () {
  //       console.log("Payment closed");
  //     },
  //     customizations: {
  //       title: "My store",
  //       description: "Payment for items in cart",
  //       logo: "https://assets.piedpiper.com/logo.png",
  //     },
  //   });

  //   // Open payment form on button click
  //   document.getElementById("payButton").addEventListener("click", function () {
  //     paymentForm.open();
  //   });
  // };

  //payment
  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };

  // const handleCheckout = async () => {
  //   const res = await loadScript("https://checkout.flutterwave.com/v3.js");
  //   if (!res) {
  //     alert("Flutterwave SDK failed to load");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "https://localhost:4000/api/user/order/checkout",
  //       "",
  //       config
  //     );
  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }

  //   const options = {
  //     public_key: process.env.FLW_PUBLIC_KEY,
  //     tx_ref: Date.now(),
  //     amount: amount,
  //     currency: currencey,
  //     payment_options: "card, banktransfer, ussd",
  //     redirect_url:
  //       "https://localhost:4000/api/user/order/handle-flutterwave-payment",

  //     order_id: order_id,
  //     handler: async function (response) {
  //       const data = {
  //         orderCreationId: order_id,
  //         flutterwavePayment: response.flutterwave_payment_id,
  //         flutterwaveOrderId: response.flutterwave_order_id,
  //       };
  //       try {
  //         const result = await axios.post(
  //           "https://localhost:4000/api/user/order/paymentVerification",
  //           data,
  //           config
  //         );
  //         alert(result);
  //       } catch (error) {
  //         console.error("Payment verification failed", error);
  //       }
  //     },
  //     meta: {
  //       consumer_id: 23,
  //       consumer_mac: "92a3-912ba-1192a",
  //     },
  //     customer: {
  //       email: "test@example.com",
  //       phone_number: "12345678",
  //       name: "Namo Dynamic",
  //     },
  //     customizations: {
  //       title: "My Store",
  //       description: "Test Transaction",
  //       logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
  //     },
  //   };
  //   const { amount, id: order_id, currencey } = result.data.order;
  //   const paymentObject = new window.flutterwave(options);
  //   paymentObject.open();
  // };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">myShoplify</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Nnamdi Ekechi (nnamdi4u09@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    className="form-control form-select"
                    id=""
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Nigeria">Nigeria</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc"
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.other}
                  />
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select
                    name="state"
                    className="form-control form-select"
                    id=""
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    value={formik.values.state}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Lagos">Lagos</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Post Code"
                    className="form-control"
                    name="postcode"
                    onChange={formik.handleChange("postcode")}
                    onBlur={formik.handleBlur("postcode")}
                    value={formik.values.postcode}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.postcode && formik.errors.postcode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <IoIosArrowBack className="me-2" /> Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button
                      className="button"
                      type="submit"
                      // onClick={hanndleCheckout}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            width={100}
                            height={100}
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price">{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">SubTotal</p>
                <p className="total-price">
                  $ ${totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                ${totalAmount ? totalAmount + 5 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
