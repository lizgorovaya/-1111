document.getElementById('birthDate').addEventListener('focus', function() {
    this.type = 'date';
});

document.getElementById('birthDate').addEventListener('blur', function() {
    if (this.value === '') {
        this.type = 'text';
    }
});

$(function() {
    $("#birthDate").datepicker({
        showAnim: "fadeIn",
        beforeShow: function(input, inst) {
            setTimeout(function() {
                inst.dpDiv.css({
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white'
                });
            }, 0);
        }
    });
});
document.getElementById('birthDate').addEventListener('focus', function() {
    this.type = 'date';
});

document.getElementById('birthDate').addEventListener('blur', function() {
    if (this.value === '') {
        this.type = 'text';
    }
});

$(function() {
    $("#birthDate").datepicker({
        showAnim: "fadeIn",
        beforeShow: function(input, inst) {
            setTimeout(function() {
                inst.dpDiv.css({
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white'
                });
            }, 0);
        }
    });
});

const phoneModal = document.getElementById("phoneModal");
const phoneFieldsContainer = document.getElementById("phoneFieldsContainer");
const phoneError = document.getElementById("phoneError");

function openPhoneModal() {
    phoneModal.classList.add("active");
}

function closePhoneModal() {
    phoneModal.classList.remove("active");
}

window.onclick = function(event) {
    if (event.target === phoneModal) {
        closePhoneModal();
    }
};

function addPhoneField() {
    const phoneFields = phoneFieldsContainer.querySelectorAll(".phone-input");
    if (phoneFields.length >= 5) {
        phoneError.style.display = "block";
        return;
    }

    const phoneFieldWrapper = document.createElement("div");
    phoneFieldWrapper.className = "phone-entry";

    const countryCodeSelect = document.createElement("select");
    countryCodeSelect.className = "country-code";
    countryCodeSelect.innerHTML = `<option value="+375">🇧🇾 +375</option><option value="+7">🇷🇺 +7</option>`;

    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.className = "phone-input";
    phoneInput.placeholder = "(__) ___-__-__";

    phoneFieldWrapper.appendChild(countryCodeSelect);
    phoneFieldWrapper.appendChild(phoneInput);
    phoneFieldsContainer.appendChild(phoneFieldWrapper);
    phoneError.style.display = "none";
}

function savePhoneNumbers() {
    const phoneFields = phoneFieldsContainer.querySelectorAll(".phone-input");
    const phoneNumbers = [];

    phoneFields.forEach(function(input) {
        const countryCode = input.previousElementSibling.value;
        const phoneNumber = input.value;
        phoneNumbers.push({ countryCode, phoneNumber });


        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'phoneNumbers[]'; 
        hiddenInput.value = `${countryCode} ${phoneNumber}`;
        document.getElementById("yourFormId").appendChild(hiddenInput);
    });

    console.log("Phone numbers saved:", phoneNumbers);
    closePhoneModal();
}

    const savePhoneButton = document.getElementById("savePhoneButton");

    if (savePhoneButton) {
        savePhoneButton.addEventListener('click', function() {
            savePhoneNumbers();
        });
    } else {
        console.log("Кнопка сохранения не найдена!");
    }

    function toggleMaritalStatusDropdown() {
        const container = document.querySelector(".marital-status-container");
        const dropdown = document.getElementById("maritalStatusDropdown");

        container.classList.toggle("active");
        dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
    }

    window.addEventListener("click", function (event) {
        const container = document.querySelector(".marital-status-container");
        const dropdown = document.getElementById("maritalStatusDropdown");

        if (!container.contains(event.target)) {
            container.classList.remove("active");
            dropdown.style.display = "none";
        }
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); 

        let formData = new FormData(this);
        fetch('ind.php', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
        .then(data => console.log(data)) 
        .catch(error => console.error('Error:', error));
        
    });
