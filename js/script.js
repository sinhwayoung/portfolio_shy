document.addEventListener("DOMContentLoaded", function () {
  // 애니메이션 설정
  const animatedElements = document.querySelectorAll(
    ".jello-horizontal, .roll-in-left, .scale-up-center, .tracking-in-contract, .scroll, .tracking-out-expand"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => {
    element.style.animationPlayState = "paused";
    observer.observe(element);
  });

  // 메뉴 하이라이팅 및 스크롤 이동 설정
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".gnb li a");

  function highlightMenuByHash(hash) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      }
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          window.history.pushState(null, null, `#${id}`);
          highlightMenuByHash(`#${id}`);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSectionId = this.getAttribute("href");
      const targetSection = document.querySelector(targetSectionId);
      targetSection.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, null, targetSectionId);
      highlightMenuByHash(targetSectionId);
    });
  });

  if (window.location.hash) {
    highlightMenuByHash(window.location.hash);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // SEE MORE 버튼 클릭 시 모달 열기
  document.querySelectorAll(".openModal").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let id = this.getAttribute("data-id");
      document.getElementById("modal" + id).style.display = "flex"; // flex로 변경하여 중앙 정렬 유지
    });
  });

  // 모달 닫기 버튼 클릭 시 모달 닫기
  document.querySelectorAll(".close").forEach((span) => {
    span.addEventListener("click", function () {
      let id = this.getAttribute("data-id");
      document.getElementById("modal" + id).style.display = "none";
    });
  });

  // 모달 외부 클릭 시 모달 닫기
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null, // viewport 사용
    threshold: 0.5, // 섹션이 50% 이상 보일 때 트리거
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 모든 링크에서 'active' 클래스 제거
        navLinks.forEach((link) => link.classList.remove("active"));

        // 현재 섹션과 관련된 링크에 'active' 클래스 추가
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // 각 섹션에 대해 observer를 설정
  sections.forEach((section) => {
    observer.observe(section);
  });
});
