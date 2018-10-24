function showAdd() {
    document.getElementById("add-container__inner").style.display = "block";
    document.getElementById("add-dropdown").classList.add("add-container__button--expanded");
    document.getElementById("add-dropdown").setAttribute('aria-expanded', 'true');
}

function hideAdd() {
    document.getElementById("add-container__inner").style.display = "none";
    document.getElementById("add-dropdown").classList.remove("add-container__button--expanded");
    document.getElementById("add-dropdown").setAttribute('aria-expanded', 'false');
}

function toggleAdd() {
    if (document.getElementById("add-container__inner").style.display === "block") {
        hideAdd();
    } else {
        showAdd();
    }
}

function addPref() {
    document.getElementById('new-name').setCustomValidity("Name of Preference must be unique!");
}

function editPref() {
    alert("should be saved...");
    // TODO: prevent reload of page?!
}

function ShowPrefs() {
    window.location = "index.html";
}

/**
 *
 * @param name name of the pref
 * @param value momentary value
 * @param isLocked true if locked
 * @param isModified true if pref is modified
 * @param Type bool, int or string
 * @param isFav true if pref is marked as favourite
 * @param isUser true if user-created, i.e. no default-value (has to be modified then)
 */
function addItem(name, value, isLocked, isModified, Type, isFav, isUser) {
    // TODO: codestyle!!
    document.getElementById("pref-table").innerHTML +=
        '<ul class="pref-table__row' + (isModified ? ' pref-table__row--edited' : '') +
        '" aria-label="Preference ' + name + '" role="list">\n' +
        '<li class="pref-table__cell">\n' +
        (isLocked
            ? '<button class="button button--ghost icon icon--lock" title="locked" disabled></button>\n'
            : (isFav
                    ? '<button class="button button--ghost icon icon--filled-star" title="is favourite"></button>\n'
                    : '<button class="button button--ghost icon icon--star" title="make favourite"></button>\n'
            )) +
        '</li>\n' +
        '<li class="pref-table__cell">\n' +
        '<span' + (isLocked ? ' class="pref-table__cell__disabled-text"' : '') +
        '>' + name.split(".").join(".<wbr>") + '</span>\n' +
        '</li>\n' +
        (Type === "bool"
                ? '<li class="pref-table__cell"><span' +
                (isLocked ? ' class="pref-table__cell__disabled-text"' : '') + '\n>' + value + '</span></li>'

                : '<li class="pref-table__cell">\n' + (isLocked
                ? '<span class="pref-table__cell__disabled-text">' + value + '</span>\n'
                : '<form id="edit-form-' + name + '" aria-label="Edit Value" onsubmit="editPref()">\n' +
                '<input type="text" value="' + value + '"' +
                (Type === "int"
                        ? 'pattern="[0-9]*" title="Please enter an integer value">\n'
                        : 'title="Please enter the value">\n'
                ) +
                '</form>\n') +
                '</li>\n'
        ) +
        '<li class="pref-table__cell">\n' +
        '<button class="button button--small" form="edit-form-' + name + '"' +
        (isLocked ? ' disabled' : '') + '>' +
        (Type === "bool" ? 'toggle' : 'save') + '</button>\n' +
        '</li>\n' +
        '<li class="pref-table__cell">\n' +
        '<button class="button button--ghost icon ' +
        (isUser
                ? 'icon--trash" title="delete preference"'
                : 'icon--reset" ' + (isModified ? 'title="reset value to default"' : '')
        ) +
        (isLocked || (!isModified) ? ' disabled' : '') +
        '></button> </li>\n';
}

addItem("captivedetect.canonicalContent", "success", true, false, 'string', false, false);
addItem("captivedetect.canonicalURL", "http://detectportal.firefox.com/success.txt", false, true, 'string', false, false);
addItem("captivedetect.maxRetryCount", 5, true, true, 'int', true, false);
addItem("captivedetect.maxWaitingTime", 5000, false, false, 'int', false, false);
addItem("captivedetect.pollingTime", 3000, false, true, 'int', false, false);
addItem("clipboard.autocopy", false, false, false, 'bool', true, false);
addItem("clipboard.plainTextOnly", false, false, true, 'bool', false, true);
