console.log("Zoon Store - YouTube Style Design");

// ======== وظائف شريط التنقل والقائمة الجانبية ========
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
}

// إغلاق القائمة الجانبية عند النقر خارجها
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("show");
    }
});

// ======== وظائف النافذة المنبثقة ========
function openPopup(product) {
    const popup = document.getElementById("popup");
    const productNameInput = document.getElementById("productName");
    
    // عرض النافذة المنبثقة
    popup.style.display = "flex";
    
    // تعبئة اسم المنتج في الحقل المخفي
    productNameInput.value = product;
    
    // تحديث عنوان النافذة
    const popupTitle = document.querySelector(".popup-title");
    popupTitle.textContent = `طلب ${product}`;
    
    // إضافة تأثير ظهور
    setTimeout(() => {
        popup.style.opacity = "1";
    }, 10);
}

function closePoupup() {
    const popup = document.getElementById("popup");
    
    // إضافة تأثير إخفاء
    popup.style.opacity = "0";
    
    // إخفاء النافذة بعد انتهاء التأثير
    setTimeout(() => {
        popup.style.display = "none";
    }, 300);
}

// إغلاق النافذة المنبثقة عند النقر خارجها
document.getElementById("popup").addEventListener('click', function(event) {
    if (event.target === this) {
        closePoupup();
    }
});

// إغلاق النافذة المنبثقة عند الضغط على زر Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closePoupup();
    }
});

// ======== وظائف النموذج ========
document.getElementById("FORMS").onsubmit = function(e) {
    e.preventDefault();
    
    // جمع بيانات النموذج
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // التحقق من البيانات (يمكن إضافة المزيد من التحقق)
    if (!data["الاسم"] || !data["رقم الهاتف"] || !data["العنوان"]) {
        alert("الرجاء تعبئة جميع الحقول المطلوبة");
        return;
    }
    
    // إظهار رسالة تحميل
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> جاري إرسال الطلب...';
    submitButton.disabled = true;
    
    // إرسال البيانات إلى Formspree
    fetch("https://formspree.io/f/xnjnewzr", {
        method: "POST",
        body: formData,
        headers: { 
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            // إعادة تعيين النموذج
            this.reset();
            
            // إغلاق النافذة المنبثقة
            closePoupup();
            
            // عرض رسالة نجاح
            alert("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
            
            // في حال نجاح الإرسال، الانتقال إلى صفحة الشكر
            setTimeout(() => {
                window.location.href = "Thanks.html";
            }, 1000);
        } else {
            throw new Error('فشل إرسال النموذج');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.");
    })
    .finally(() => {
        // إعادة زر الإرسال إلى حالته الأصلية
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
};

// ======== وظائف إضافية ========
// تحسين تجربة البحث
document.querySelector('.search-bar button').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        alert(`سيتم البحث عن: "${searchTerm}"`);
        // هنا يمكن إضافة منطق البحث الحقيقي
        searchInput.value = '';
    }
});

// السماح بالبحث بالضغط على Enter
document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-bar button').click();
    }
});

// إضافة تأثيرات تفاعلية للبطاقات
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ======== تهيئة الصفحة ========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Zoon Store loaded successfully');
    
    // إضافة أي كود تهيئة إضافي هنا
});