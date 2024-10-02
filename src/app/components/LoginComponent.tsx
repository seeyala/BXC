import Image from 'next/image';
import '../styles/global.css';

export default function LoginPage() {
  return (
    <div className="w-[1440px] h-[960px] relative overflow-hidden bg-black/25 border border-black shadow-lg">
      <p className="w-[380px] h-[47px] absolute left-[978px] top-[196px] text-5xl font-bold text-center text-black">
        Login
      </p>
      <svg
        width="420"
        height="1"
        viewBox="0 0 420 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[952px] top-[357px]"
        preserveAspectRatio="none"
      >
        <line y1="0.5" x2="420" y2="0.5" stroke="black" />
      </svg>
      <svg
        width="420"
        height="1"
        viewBox="0 0 420 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[952px] top-[479px]"
        preserveAspectRatio="none"
      >
        <line y1="0.5" x2="420" y2="0.5" stroke="black" />
      </svg>
      <p className="w-[206px] h-7 absolute left-[953px] top-[330px] text-xl font-bold text-left text-black/40">
        Username
      </p>
      <p className="w-[206px] h-7 absolute left-[953px] top-[452px] text-xl font-bold text-left text-black/40">
        Password
      </p>
      <svg
        width="39"
        height="33"
        viewBox="0 0 39 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[38.26px] h-[32.75px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M19.1299 0C13.8692 0 9.56495 4.58512 9.56495 10.2346C9.56495 15.8842 13.8692 20.4693 19.1299 20.4693C24.3906 20.4693 28.6948 15.8842 28.6948 10.2346C28.6948 4.58512 24.3906 0 19.1299 0ZM9.13452 20.4693C4.0651 20.674 0 24.2356 0 28.657V32.7508H38.2598V28.657C38.2598 24.2356 34.2425 20.674 29.1253 20.4693C26.5427 22.9665 23.0037 24.5631 19.1299 24.5631C15.2561 24.5631 11.7171 22.9665 9.13452 20.4693Z"
          fill="#999999"
        />
      </svg>
      <svg
        width="38"
        height="33"
        viewBox="0 0 38 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[38px] h-[33px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M19 0C12.0333 0 6.33333 4.24286 6.33333 9.42857V14.1429H0V33H38V14.1429H31.6667V9.42857C31.6667 4.24286 25.9667 0 19 0ZM19 4.71429C22.5467 4.71429 25.3333 6.78857 25.3333 9.42857V14.1429H12.6667V9.42857C12.6667 6.78857 15.4533 4.71429 19 4.71429Z"
          fill="#999999"
        />
      </svg>
      <Image
        src="/login.png"
        alt="Login"
        width={90}
        height={90}
        className="absolute left-[1113px] top-[549px] object-contain"
      />
      <p className="w-[202px] h-12 absolute left-[75px] top-[19px] text-xl font-bold text-left text-black">
        Name company
      </p>
      <p className="w-[199px] h-6 absolute left-[953px] top-[503px] text-base font-bold text-left text-[#7c7c7c]">
        Forget Password
      </p>
    </div>
  );
}
