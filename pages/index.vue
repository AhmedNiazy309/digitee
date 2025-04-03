<template>
  <div class="landingPage">
    <div class="header pt-6 pb-52 bg-cover">
      <div class="card pb-6">
        <div class="flex justify-between items-center container">
          <div>
            <img src="/images/logo.svg" alt="">
          </div>
          <div class="flex items-center">
            <Menubar :model="items" class="!border-0 !bg-transparent" />
            <nuxt-link to="/login" class="mr-3 button btn-transparent p-[10px] md:p-[10px_20px]">
              Login
            </nuxt-link>
            <nuxt-link to="/login" class="button btn-white p-[10px] md:p-[10px_20px]">
              signup
            </nuxt-link>

          </div>
        </div>
      </div>
      <div class="container relative ">
        <img ref="circleImg" src="/images/circle.svg"
          class="hidden md:block absolute right-[37%] top-[-70px] w-[300px] h-[300px]" alt="">

        <header class="flex flex-wrap gap-4 mt-20 relative z-20">
          <div class="md:w-[48%] w-full  relative z-20">
            <h2 ref="heading" class="lg:text-[72px] md:text-[50px] text-[30px]">
              SaaS Delivery Management Software
            </h2>
            <p ref="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis autem vel eum iure reprehenderit qui in ea voluptate
            </p>
            <div class="flex gap-6 mt-10 flex-wrap">
              <nuxt-link to="/login" class="button btn-white p-[15px_30px] md:w-[220px] w-full text-center">
                Get started
              </nuxt-link>
              <nuxt-link to="/login"
                class="flex gap-3 items-center button btn-transparent p-[15px_20px] md:w-[220px] w-full text-center">
                <img src="/images/watch.svg" alt="">
                Watch Now
              </nuxt-link>
            </div>
            <div class="flex gap-10 mt-10 flex-wrap">
              <div class="freeRegiter flex gap-3 text-white">
                <img src="/images/check.svg" alt="">
                <span>Free Register</span>
              </div>
              <div class="greatServices flex gap-3 text-white">
                <img src="/images/check.svg" alt="">
                <span>Great Service</span>
              </div>
            </div>
          </div>
          <div class="md:w-[48%] md:block hidden relative z-20">
            <img src="/images/header.svg" alt="">
          </div>
        </header>
      </div>
    </div>
    <div class="companyHelped my-16">
      <div class="container">
        <MainSection title="Companies we have helped grow" :withStyle="false" />
        <client-only>
          <Carousel :items-to-show="4" :breakpoints="breakpoints" wrap-around :gap="20">
            <Slide v-for="(image, index) in images" :key="index">
              <img :src="image" alt="Image" class="w-full h-auto object-scale-down" />
            </Slide>
          </Carousel>
        </client-only>
      </div>
    </div>
    <div class="aboutProcess">
      <div class="container">
        <MainSection title="Learn more about process"
          description="Quis autem vel eum iure reprehenderit qui in ea voluptate" :withStyle="true" />
        <div class="flex justify-between items-center relative py-20 px-10 flex-wrap">
          <!-- SVG for Curved Lines -->
          <svg class="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] hidden-1365" viewBox="0 0 1190 110" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1.67712 108.227C1.67712 108.227 104.139 1 298.339 1C492.539 1 595 108.227 595 108.227"
              stroke="#5A72EA" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 10" />
            <path d="M595 108.227C595 108.227 697.461 1 891.661 1C1085.86 1 1188.32 108.227 1188.32 108.227"
              stroke="#5A72EA" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 10" />
          </svg>

          <div
            class="relative flex flex-col items-center md:max-w-[33.333%] md:w-[33.333%] w-full md:mt-0 mt-20 m-auto  connect ">
            <div
              class="bg-white border border-blue-500 w-12 h-12 flex items-center justify-center rounded-full text-blue-500 font-bold absolute -top-10">
              01</div>
            <div
              class="w-[300px] bg-white shadow-lg rounded-xl p-6 text-center h-[200px] shadow-[0px_5px_0px_#5A72EA,0px_10px_0px_#8468B1,0px_15px_20px_rgba(0,0,0,0.3)]">
              <img src="/images/connect-icon.svg" alt="connect" class="w-12 mx-auto mb-4" />
              <h3 class="text-xl font-semibold">Connect</h3>
              <p class="text-gray-500 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.</p>
            </div>
          </div>

          <div
            class="relative flex flex-col items-center md:max-w-[33.333%] md:w-[33.333%] w-full md:mt-0 mt-20 m-auto  collect ">
            <div
              class="bg-white border border-blue-500 w-12 h-12 flex items-center justify-center rounded-full text-blue-500 font-bold absolute -top-10">
              02</div>
            <div class="w-[300px] bg-white shadow-lg rounded-xl p-6 text-center h-[200px]">
              <img src="/images/collect-icon.svg" alt="collect" class="w-12 mx-auto mb-4" />
              <h3 class="text-xl font-semibold">Collect</h3>
              <p class="text-gray-500 text-sm">Who chooses to enjoy a pleasure that has no annoying consequences.</p>
            </div>
          </div>

          <div
            class="relative flex flex-col items-center md:max-w-[33.333%] md:w-[33.333%] w-full md:mt-0 mt-20 m-auto  convert">
            <div
              class="bg-white border border-blue-500 w-12 h-12 flex items-center justify-center rounded-full text-blue-500 font-bold absolute -top-10">
              03</div>
            <div class="w-[300px] bg-white shadow-lg rounded-xl p-6 text-center h-[200px]">
              <img src="/images/convert-icon.svg" alt="convert" class="w-12 mx-auto mb-4" />
              <h3 class="text-xl font-semibold">Convert</h3>
              <p class="text-gray-500 text-sm">Nam libero tempore, cum soluta nobis est eligendi optio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="price my-16 relative">
      <div class="container">
        <MainSection title="Start today, with free or premium plan, you choose"
          description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis" :withStyle="true" />
        <img src="/images/leftCircle.png" class="absolute top-0 left-0 hidden md:block" alt="">
        <div class="flex flex-col md:flex-row justify-center items-center gap-6 py-10 px-4 md:px-20">
          <!-- Basic Plan -->
          <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl p-8 w-full md:w-1/2">
            <div class="flex-1">
              <span
                class="inline-block border border-blue-500 text-blue-500 text-xs font-semibold px-4 py-1 rounded-full">
                BASIC PLAN
              </span>
              <h2 class="text-4xl font-bold text-gray-800 mt-4">
                $0 <span class="text-lg font-normal">per month</span>
              </h2>
              <p class="text-gray-500 mt-4">
                {{ plans.basic.description }}
              </p>
              <button
                class="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
                Join now
              </button>
            </div>
            <ul class="mt-6 space-y-2">
              <li v-for="(feature, index) in plans.basic.features" :key="'basic-' + index"
                class="flex items-center text-gray-600">
                <img src="/images/check.svg" class="mr-2" alt="check"> {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Premium Plan -->
          <div
            class="flex flex-col md:flex-row bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg rounded-2xl p-8 w-full md:w-1/2 text-white">
            <div class="flex-1">
              <span class="inline-block bg-white bg-opacity-20 text-white text-xs font-semibold px-4 py-1 rounded-full">
                PREMIUM PLAN
              </span>
              <h2 class="text-4xl font-bold mt-4">
                $99 <span class="text-lg font-normal">per month</span>
              </h2>
              <p class="mt-4">
                {{ plans.premium.description }}
              </p>
              <button
                class="mt-6 w-full bg-white text-blue-500 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
                Join now
              </button>
            </div>
            <ul class="mt-6 space-y-2">
              <li v-for="(feature, index) in plans.premium.features" :key="'premium-' + index"
                class="flex items-center">
                <img src="/images/whiteCheck.svg" class="mr-2" alt="check"> {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="feature">
      <div class="container">
        <MainSection title="Features for you"
          description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore"
          :withStyle="true" />
        <div class="py-16 px-4 md:px-20 text-center">
          <div ref="featuresContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(feature, index) in features" :key="index"
              class="relative bg-white shadow-lg rounded-2xl p-6 transition transform hover:-translate-y-2 hover:shadow-2xl opacity-0"
              :class="{ 'shadow-[0px_5px_0px_#5A72EA,0px_10px_0px_#8468B1,0px_15px_20px_rgba(0,0,0,0.3)]': index === 1 }"
              :ref="(el) => featureRefs[index] = el">
              <img :src="feature.icon" class="w-16 mx-auto mb-4" alt="Feature Icon" />
              <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
              <p class="text-gray-500 mt-2">{{ feature.description }}</p>
            </div>
          </div>

          <button
            class="mt-24 bg-blue-500 text-white py-3  px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            Explore Features
          </button>
        </div>
      </div>
    </div>
    <div class="clients pt-16 relative">
      <img src="/images/rightCircle.png" class="absolute right-0 top-[-5rem] hidden md:block" alt="">
      <div class="container">
        <MainSection title="Check what our clients are saying" description="Cum soluta nobis est eligendi optio cumque"
          :withStyle="true" />
        <div class="container mx-auto py-8">
          <div class="clientsCarousel">
            <Carousel v-model="currentSlide" :items-to-show="1.1" :breakpoints="breakpoints" :wrap-around="true"
              class="rounded-lg  mb-4">
              <Slide v-for="(slide, index) in testimonials" :key="index" class="bg-white slideClidents"
                :class="index == currentSlide ? '' : '!scale-75'">
                <div class="flex items-center bg-white" :class="index == currentSlide ? 'px-8' : ''">
                  <img :src="slide.image" alt="Slide image" class="w-[72px] object-scale-down rounded-full" />
                  <div class="p-4 w-full rounded-b-lg bg-white" :class="index === currentSlide ? 'block' : 'hidden'">
                    <h2 class="text-[18px] font-[500] text-[#181818] mb-2 text-center">{{ slide.title }}</h2>
                    <h2 class="text-[16px] font-[400] text-[#5A5A5A] mb-2 text-center">{{ slide.name }}</h2>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>

          <Carousel v-model="currentSlide" :items-to-show="1" :wrap-around="true" :pagination-enabled="true"
            class="rounded-lg p-8">
            <Slide v-for="(slide, index) in testimonials" :key="index" class="text-center bg-white py-5 mb-3">
              <div class="flex flex-col items-center">
                <div class="flex justify-center mt-2">
                  <span v-for="star in 5" :key="star" class="text-yellow-400">
                    <img src="/images/Star.svg" alt="">
                  </span>
                </div>

                <!-- الرسالة -->
                <p class="text-gray-600 mt-4 text-sm leading-relaxed max-w-xl">{{ slide.message }}</p>

                <!-- شعار الشركة -->
                <div class="mt-6">
                  <img src="/images/Aven.png" alt="Company Logo" class="h-6 mx-auto" />
                </div>
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
      <div class="getStartedCard mt-16">
        <div class="container">
          <div class="signup-section py-16 px-8 rounded-lg text-white">
            <div class="container">

              <div class="md:w-[75%]">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Sign up and get started</h2>
                <p class="text-lg font-medium mb-8">Free trial 14 days of change and without obligation</p>
                <div class="flex flex-col md:flex-row  gap-4">
                  <input type="email" placeholder="Enter your email here"
                    class="w-full md:w-1/2 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  <button
                    class="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                    Register for free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="question">
        <MainSection title="Do you have any question"
          description="Our support team ready to help you, please contact with them" :withStyle="true" />
        <div class="max-w-2xl mx-auto p-4">
          <div class="max-w-3xl mx-auto p-4">
            <Accordion :activeIndex="activeIndex" @tab-click="toggleTab">
              <AccordionTab v-for="(item, index) in faqs" :key="index">
                <template #header>
                  <div
                    class="flex items-center w-full p-4 text-lg font-medium rounded-lg cursor-pointer transition-all gap-3">
                    <span
                      class="w-8 h-8 flex items-center justify-center text-white font-bold rounded-full bg-blue-500">
                      {{ activeIndex === index ? '-' : '+' }}
                    </span>
                    <span class="text-gray-700">{{ item.question }}</span>
                  </div>
                </template>
                <p class="p-4 text-gray-700 rounded-b-lg">
                  {{ item.answer }}
                </p>
              </AccordionTab>
            </Accordion>
            <button
              class="mt-24 text-center block m-auto w-[200px] bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
              More Faqs
            </button>

          </div>
        </div>
      </div>
      <img src="/images/leftCircle.png" class="absolute bottom-0 left-0 hidden md:block" alt="">
    </div>
    <footer class="bg-white text-gray-700">
      <div class="container mx-auto px-6 py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <img src="/images/logoFooter.png" class="mb-5" alt="">
            <p class="mt-3 text-sm">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            </p>
            <div class="flex space-x-3 mt-4">
              <Button icon="pi pi-globe" class="p-button-rounded !bg-[#5A72EA] !p-button-[#5A72EA]" />
              <Button icon="pi pi-instagram" class="p-button-rounded !bg-[#5A72EA] !p-button-[#5A72EA]" />
              <Button icon="pi pi-twitter" class="p-button-rounded !bg-[#5A72EA] !p-button-[#5A72EA]" />
              <Button icon="pi pi-youtube" class="p-button-rounded !bg-[#5A72EA] !p-button-[#5A72EA]" />
            </div>
          </div>

          <!-- Sections -->
          <div v-for="(section, index) in sections" :key="index">
            <h3 class="text-[#5A72EA]">{{ section.title }}</h3>
            <ul class="mt-2 space-y-2">
              <li v-for="(item, i) in section.items" :key="i" class="text-sm hover:text-blue-500 cursor-pointer">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-[#5A72EA] text-white text-sm py-8">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© 2022</p>
          <div class="flex space-x-4 mt-2 md:mt-0">
            <span class="hover:underline cursor-pointer">FAQ</span>
            <span class="hover:underline cursor-pointer">Terms & Conditions</span>
            <span class="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref } from "vue";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from "vue3-carousel";
const sections = [
  {
    title: "Company",
    items: ["About", "Career", "Pricing", "Service"],
  },
  {
    title: "Product",
    items: ["Invoice", "Contract", "Accounting", "Proposal"],
  },
  {
    title: "Resource",
    items: ["API Docs", "Tutorial Video", "How to Create"],
  },
  {
    title: "Contact",
    items: ["yourmail@mern.com", "+012-345-678-90", "St. London Maeren 01928"],
  },
];
const items = ref([
  {
    label: 'Home',
  },
  {
    label: 'Products',
  },
  {
    label: 'Solutions',
  },
  {
    label: 'pricing',
  },
]);
import { gsap } from 'gsap'

const circleImg = ref(null)
const heading = ref(null)
const paragraph = ref(null)
const featureRefs = ref([]);

const images = ref([
  '/images/Aven.png',
  '/images/Velocity 9.png',
  '/images/Treva.png',
  '/images/Liva.png',
  '/images/Ideaa.png',

]);

const breakpoints = {
  1200: { itemsToShow: 4 },
  1024: { itemsToShow: 3 },
  768: { itemsToShow: 2 },
  480: { itemsToShow: 1 },
};
const breakpointsClients = {
  1200: { itemsToShow: 6.1 },
  1024: { itemsToShow: 3.1 },
  768: { itemsToShow: 2.1 },
  480: { itemsToShow: 1.1 },
};
const plans = reactive({
  basic: {
    description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus",
    features: [
      "Limited access library",
      "Commercial license",
      "Hotline support 24/7",
      "100+ HTML UI Elements",
      "eCommerce builder"
    ]
  },
  premium: {
    description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.",
    features: [
      "Limited access library",
      "Commercial license",
      "Hotline support 24/7",
      "300+ HTML UI Elements",
      "eCommerce builder"
    ]
  }
});
const features = reactive([
  {
    icon: "/images/secure.svg",
    title: "Fully Secured",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
  },
  {
    icon: "/images/management.svg",
    title: "Management",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit"
  },
  {
    icon: "/images/data.svg",
    title: "Strong Data",
    description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis"
  },
  {
    icon: "/images/analysis.svg",
    title: "Analysis",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam"
  }
]);
const activeIndex = ref(null);

const faqs = [
  {
    question: "Website response taking time, how to improve?",
    answer:
      "Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.",
  },
  {
    question: "App installation failed, how to update system information?",
    answer:
      "Ensure your system meets the minimum requirements and try reinstalling the app. If the issue persists, contact support.",
  },
  {
    question: "New update fixed all bug and issues?",
    answer:
      "Yes, the latest update addresses all known bugs and improves system performance significantly.",
  },
];
const testimonials = ref([
  {
    image: '/images/Aven.png',
    name: 'Cristifer Vaccaro',
    title: 'CEO PT Aven',
    stars: [1, 2, 3, 4, 5],
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    image: '/images/Aven.png',
    name: 'Jane Doe',
    title: 'Marketing Director',
    stars: [1, 2, 3, 4],
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    image: '/images/Aven.png',
    name: 'Cristifer Vaccaro',
    title: 'CEO PT Aven',
    stars: [1, 2, 3, 4, 5],
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    image: '/images/Aven.png',
    name: 'Jane Doe',
    title: 'Marketing Director',
    stars: [1, 2, 3, 4],
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    image: '/images/Aven.png',
    name: 'Cristifer Vaccaro',
    title: 'CEO PT Aven',
    stars: [1, 2, 3, 4, 5],
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    image: '/images/Aven.png',
    name: 'Jane Doe',
    title: 'Marketing Director',
    stars: [1, 2, 3, 4],
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    image: '/images/Aven.png',
    name: 'Cristifer Vaccaro',
    title: 'CEO PT Aven',
    stars: [1, 2, 3, 4, 5],
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    image: '/images/Aven.png',
    name: 'Jane Doe',
    title: 'Marketing Director',
    stars: [1, 2, 3, 4],
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    image: '/images/Aven.png',
    name: 'Cristifer Vaccaro',
    title: 'CEO PT Aven',
    stars: [1, 2, 3, 4, 5],
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    image: '/images/Aven.png',
    name: 'Jane Doe',
    title: 'Marketing Director',
    stars: [1, 2, 3, 4],
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    image: '/images/Aven.png',
    name: 'John Smith',
    title: 'CTO at Example',
    stars: [1, 2, 3, 4, 5],
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
])

const currentSlide = ref(0)

onMounted(() => {
  gsap.from("path", { strokeDasharray: "500", strokeDashoffset: "500", duration: 2, ease: "power2.out" });
  gsap.fromTo(
    circleImg.value,
    { scale: 0, opacity: 0, rotation: -360 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 2,
      ease: 'back.out(1.7)',
      repeat: 2
    }
  )
  heading.value.textContent = ""

  gsap.to(heading.value, {
    duration: 3,
    text: "SaaS Delivery Management Software",
    ease: "none"
  })
  gsap.from(paragraph.value, {
    opacity: 0,
    y: 50,
    duration: 3,
    ease: 'power3.out',
    delay: 3
  })
  gsap.fromTo(
    featureRefs.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
  );
})
const toggleTab = (event) => {
  const index = event.index;
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>
<style lang="scss" scoped>
.button {
  border-radius: 11px;
  font-size: 20px;
  font-weight: 500;

  &.btn-transparent {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  }

  &.btn-white {
    background-color: #fff;
    color: #5A72EA;
  }
}

.header {
  background-image: url("/images/bgHeader.svg");

  header {
    h2 {
      font-weight: 600;
      color: #fff;
      text-shadow: 2px 4px 26px rgba(90, 114, 234, 0.81);
    }

    p {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      margin-top: 30px;
    }
  }
}

.connect {
  border-bottom: 10px solid;

  border-image-source: linear-gradient(232.69deg, #5A72EA 28.37%, #8468B1 95.18%);


}

@media(min-width:1365px) {
  .connect {
    transform: translate(-180px, 60px)
  }

  .collect {
    transform: translate(0, 60px)
  }

  .convert {
    transform: translate(180px, 60px)
  }
}

@media (max-width:1365px) {
  .hidden-1365 {
    display: none;
  }
}

.clients {
  background-image: url("/images/clientbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-bottom: 28px;
}

.signup-section {
  background-image: url("/images/startedBg.png");
  border-radius: 16px;
}

.signup-section input {
  font-size: 16px;
  background: #FFFFFF4D;
  border: 1px solid #fff;
  color: #fff;
}

.signup-section input::placeholder {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.signup-section button {
  font-size: 16px;
  transition: all 0.3s ease;
}

.p-accordion .p-accordion-header .p-accordion-header-link {
  @apply flex items-center justify-between w-full p-4 text-lg font-medium rounded-lg;
}
</style>