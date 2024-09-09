const url = 'http://localhost:3000/api/clients';

function createElement(tag, param, parent = null) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(param)) {
    if (key == 'classList') {
      for (const newClass of value) {
        element.classList.add(newClass);
      }
    } else {
      element[key] = value;
    }
  }

  if (parent) {
    parent.append(element);
  }

  return element
}

function createTaleBodyTr(clientObj, onShowChangeModal, onShowDeleteModal) {
  function cutId(id) {
    const newId = id.slice(-6);
    return newId
  };

  function getFullName() {
    const fullName = `${clientObj.surname} ${clientObj.name} ${clientObj.lastName}`
    return fullName
  };

  function getDate(clientDate) {
    function addZero(x) {
      if (x < 10) {
        return '0' + x
        console.log('qwe')
      } else {
        return x
        console.log('eqw')
      }
    }
    const date = new Date(clientDate);
    const newDate = `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}<span>${addZero(date.getHours())}:${addZero(date.getMinutes())}</span>`

    return newDate
  };

  function getContactsBox(contactObj) {
    const box = createElement('div', { classList: ['hero__contacts-box'] });
    const icon = createElement('div', { classList: ['hero__contacts-icon'] }, box);
    const placeHolder = createElement('div', { classList: ['hero__contatcs-placeholder', 'hidden'] }, box);

    if (contactObj.type == 'Телефон') {
      icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>';
      icon.type = contactObj.type
      placeHolder.textContent = contactObj.value;
    } else {
      if (contactObj.type == 'Email') {
        icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>';
        icon.type = contactObj.type
        placeHolder.textContent = contactObj.value;
      } else {
        if (contactObj.type == 'Vk') {
          icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></g></svg>';
          icon.type = contactObj.type
          placeHolder.textContent = contactObj.value;
        } else {
          if (contactObj.type == 'Facebook') {
            icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>';
            icon.type = contactObj.type
            placeHolder.textContent = contactObj.value;
          } else {
            icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>';
            icon.type = contactObj.type
            placeHolder.innerHTML = `${contactObj.type}: <span>${contactObj.value}</span>`;
          }
        }
      }
    }

    icon.addEventListener('mouseover', () => {
      placeHolder.classList.remove('hidden');
    });

    icon.addEventListener('mouseout', () => {
      placeHolder.classList.add('hidden');
    })

    return box
  };

  const changeBtn = createElement('button', { classList: ['hero__action-change-btn', 'btn-reset'] });
  const changeIconWrapper = createElement('div', { classList: ['hero__action-icon'] }, changeBtn);
  changeIconWrapper.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 9.5002V12.0002H2.5L9.87333 4.62687L7.37333 2.12687L0 9.5002ZM11.8067 2.69354C12.0667 2.43354 12.0667 2.01354 11.8067 1.75354L10.2467 0.193535C9.98667 -0.0664648 9.56667 -0.0664648 9.30667 0.193535L8.08667 1.41354L10.5867 3.91354L11.8067 2.69354Z" fill="#9873FF"/></svg>'
  const changeText = createElement('span', { classList: ['hero__action-change-btn-text'], textContent: 'Изменить' }, changeBtn);
  const spinerChangeBtn = createElement('span', { classList: ['hero__action-change-btn-spiner'] });

  const deleteBtn = createElement('button', { classList: ['hero__action-delete-btn', 'btn-reset'] });
  const deleteIconWrapper = createElement('div', { classList: ['hero__delete-icon'] }, deleteBtn);
  deleteIconWrapper.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/></svg>'
  const deleteText = createElement('span', { classList: ['hero__action-btn', 'btn-reset'], textContent: 'Удалить' }, deleteBtn);
  const spinerDeleteBtn = createElement('span', { classList: ['hero__action-delete-btn-spiner'] });

  const tr = createElement('tr', {});
  const tdId = createElement('td', {}, tr);
  const tdFullName = createElement('td', {}, tr);
  const tdCreateAt = createElement('td', {}, tr);
  const tdUpdateAt = createElement('td', {}, tr);
  const tdContacts = createElement('td', { classList: ['hero__contacts-td'] }, tr);
  const tdContactsVisibleBtn = createElement('button', { classList: ['hero__contacts-td-viible-btn', 'btn-reset'] })
  const tdAction = createElement('td', { classList: ['hero__action-td'] }, tr);

  tdId.textContent = cutId(clientObj.id);
  tdFullName.textContent = getFullName();
  tdCreateAt.innerHTML = getDate(clientObj.createdAt);
  tdUpdateAt.innerHTML = getDate(clientObj.updatedAt);

  const contactsArr = [];

  for (const item of clientObj.contacts) {
    let contact = getContactsBox(item)
    tdContacts.append(contact)
    contactsArr.push(contact)
  }

  tdContactsVisibleBtn.textContent = `+ ${contactsArr.length - 4}`

  if (contactsArr.length > 3) {
    tdContacts.append(tdContactsVisibleBtn)
    for (let i = 0; i < contactsArr.length; i++) {
      if (i > 3) {
        contactsArr[i].style.display = 'none'
      }
    }
  }

  tdContactsVisibleBtn.addEventListener('click', () => {
    for (const item of contactsArr) {
      item.style.display = 'block'
      tdContactsVisibleBtn.remove()
    }
  })

  tdAction.append(changeBtn);
  tdAction.append(deleteBtn);

  changeBtn.addEventListener('click', async () => {
    changeIconWrapper.innerHTML = '';
    changeIconWrapper.append(spinerChangeBtn);
    console.log(spinerChangeBtn)
    changeBtn.style.opacity = '1';
    await onShowChangeModal(clientObj.id);
    changeIconWrapper.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 9.5002V12.0002H2.5L9.87333 4.62687L7.37333 2.12687L0 9.5002ZM11.8067 2.69354C12.0667 2.43354 12.0667 2.01354 11.8067 1.75354L10.2467 0.193535C9.98667 -0.0664648 9.56667 -0.0664648 9.30667 0.193535L8.08667 1.41354L10.5867 3.91354L11.8067 2.69354Z" fill="#9873FF"/></svg>'
  })
  deleteBtn.addEventListener('click', async () => {
    deleteIconWrapper.innerHTML = '';
    deleteIconWrapper.append(spinerDeleteBtn);
    deleteBtn.style.opacity = '1';
    await onShowDeleteModal(clientObj.id)
    deleteIconWrapper.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/></svg>'
  })

  return tr
};

function createTableBody(clientArray, onShowChangeModal, onShowDeleteModal) {
  tableBody.innerHTML = '';

  for (const item of clientArray) {
    tableBody.append(createTaleBodyTr(item, onShowChangeModal, onShowDeleteModal));
  }
}

function createModalClient(clientObj = null, onShowDeleteModal, onChanche, onSave) {
  let client = {
    contacts: [],
  };

  if (clientObj) {
    client = clientObj
  }

  function clearInputs() {
    modalSurnameInput.value = '';
    modalNameInput.value = '';
    modalLastnameInput.value = '';
  }

  function createContactBox(contactObj = null) {
    let contact = {}

    if (contactObj) {
      contact = contactObj
    } else {
      contact.type = 'Телефон';
      contact.value = ''
      client.contacts.push(contact);
    }


    function dropDownClose() {
      dropDown.classList.add('opacity')
      setTimeout(() => {
        dropDownBox.innerHTML = '';
      }, 300);
    }

    function choiseContact(element) {
      contactChoiseInput.value = element.textContent;
      dropDownClose();
      contact.type = element.textContent;
    }

    const contactForm = createElement('form', { classList: ['contact__form', 'opacity'] });
    setTimeout(() => {
      contactForm.classList.remove('opacity')
    }, 1);
    const dropDownBox = createElement('div', {}, contactForm)
    const contactChoiseInput = createElement('input', { classList: ['contact__choise-input'] }, contactForm);
    contactChoiseInput.value = 'Телефон';
    contactChoiseInput.disabled = true;
    const contactChoiseBtn = createElement('button', { classList: ['contact__choise-btn', 'btn-reset'] }, contactForm)
    contactChoiseBtn.innerHTML = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.495029 0.689971C0.250029 0.934971 0.250029 1.32997 0.495029 1.57497L4.65003 5.72997C4.84503 5.92497 5.16003 5.92497 5.35503 5.72997L9.51003 1.57497C9.75503 1.32997 9.75503 0.93497 9.51003 0.68997C9.26503 0.44497 8.87003 0.44497 8.62503 0.68997L5.00003 4.30997L1.37503 0.684972C1.13503 0.444972 0.735029 0.444971 0.495029 0.689971Z" fill="#9873FF"/></svg>';
    const contactInput = createElement('input', { classList: ['contact__input'] }, contactForm);
    const contactDeleteBtn = createElement('button', { classList: ['contact__delete-btn', 'btn-reset', 'hidden'] }, contactForm);
    contactDeleteBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>'

    const dropDown = createElement('div', { classList: ['drop-down', 'opacity'] });
    const dropDownTell = createElement('button', { classList: ['drop-down__btn', 'btn-reset'], textContent: 'Доп. телефон' }, dropDown);
    const dropDownEmailBtn = createElement('button', { classList: ['drop-down__btn', 'btn-reset'], textContent: 'Email' }, dropDown);
    const dropDownVkBtn = createElement('button', { classList: ['drop-down__btn', 'btn-reset'], textContent: 'Vk' }, dropDown);
    const dropDownFacebookBtn = createElement('button', { classList: ['drop-down__btn', 'btn-reset'], textContent: 'Facebook' }, dropDown);
    const dropDownAnotherBtn = createElement('button', { classList: ['drop-down__btn', 'btn-reset'], textContent: 'Другой' }, dropDown);

    if (contactObj) {
      contactChoiseInput.value = contactObj.type;
      contactInput.value = contactObj.value;
      contactDeleteBtn.classList.remove('hidden')
    }

    dropDownTell.addEventListener('click', (e) => {
      e.preventDefault()
      contactChoiseInput.value = 'Телефон';
      contact.type = 'Телефон';
      contactChoiseBtn.classList.toggle('rotate');
      dropDownClose();
    })
    dropDownEmailBtn.addEventListener('click', (e) => {
      e.preventDefault()
      contactChoiseBtn.classList.toggle('rotate');
      choiseContact(dropDownEmailBtn);
    })
    dropDownVkBtn.addEventListener('click', (e) => {
      e.preventDefault()
      contactChoiseBtn.classList.toggle('rotate');
      choiseContact(dropDownVkBtn);
    })
    dropDownFacebookBtn.addEventListener('click', (e) => {
      e.preventDefault()
      contactChoiseBtn.classList.toggle('rotate');
      choiseContact(dropDownFacebookBtn);
    })

    dropDownAnotherBtn.addEventListener('click', (e) => {
      e.preventDefault()
      contactChoiseBtn.classList.toggle('rotate');
      contactChoiseInput.disabled = false;
      contactChoiseInput.value = '';
      dropDownClose();
      contactChoiseInput.focus();
    })

    contactChoiseInput.addEventListener('input', () => {
      contact.type = contactChoiseInput.value;
    })

    contactInput.addEventListener('input', () => {
      if (contactInput == '') {
        contactDeleteBtn.classList.add('hidden');
      } else {
        contactDeleteBtn.classList.remove('hidden');
      }
      contact.value = contactInput.value;
    })

    contactChoiseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactChoiseBtn.classList.toggle('rotate');
      if (contactChoiseBtn.classList.contains('rotate')) {
        dropDownBox.append(dropDown);
        setTimeout(() => {
          dropDown.classList.remove('opacity');
        }, 1);
      } else {
        dropDownClose()
      }
    })

    contactDeleteBtn.addEventListener('click', (e) => {
      e.preventDefault()
      contactForm.style.opacity = '0';
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.remove();
      }, 200);
      for (let i = 0; i < client.contacts.length; i++) {
        if (client.contacts[i].value == contact.value && client.contacts[i].type == contact.type) {
          client.contacts.splice(i, 1)
          break
        }
      }
      if (client.contacts.length < 10) {
        modalAddContactBtn.disabled = false;
        modalAddContactBtn.classList.remove('modal__add-contact-btn-disabled');
      }
    })

    return contactForm
  }

  function closeModal() {
    modalBox.classList.add('up');
    modal.style.opacity = '0'
    setTimeout(() => {
      modal.innerHTML = '';
      clearInputs();
      modal.remove();
    }, 300);
  }

  const modal = createElement('div', { classList: ['modal', 'opacity'] });
  setTimeout(() => {
    modal.classList.remove('opacity')
  }, 200);
  const modalBox = createElement('div', { classList: ['modal__box'] }, modal);
  const modalHeader = createElement('div', { classList: ['modal__header'] }, modalBox);
  const modalHeaderTitle = createElement('h2', { classList: ['modal__header-title'], textContent: 'Новый клиент' }, modalHeader);
  if (clientObj) {
    modalHeaderTitle.textContent = 'Изменить данные'
    const modalheadrId = createElement('span', { classList: ['modal__header-id'], textContent: `id: ${clientObj.id}` }, modalHeader)
  }
  const modalHeaderCloseBtn = createElement('button', { classList: ['modal__header-close-btn', 'btn-reset'] }, modalHeader);
  modalHeaderCloseBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" fill="#B0B0B0"/></svg>'
  const modalBody = createElement('div', { classList: ['modal__body'] }, modalBox);
  const modalForm = createElement('form', { classList: ['modal__form'] }, modalBody);

  const modalSurnameBox = createElement('div', { classList: ['modal__input-box'] }, modalForm);
  const modalSurnameInput = createElement('input', { classList: ['modal__input'] }, modalSurnameBox);
  const modalSurnamePlaceholder = createElement('div', { classList: ['modal__input-placeholder'] }, modalSurnameBox);
  modalSurnamePlaceholder.innerHTML = 'Фамилия<span>*</span>';

  const modalNameBox = createElement('div', { classList: ['modal__input-box'] }, modalForm);
  const modalNameInput = createElement('input', { classList: ['modal__input'] }, modalNameBox);
  const modalNamePlaceholder = createElement('div', { classList: ['modal__input-placeholder'] }, modalNameBox);
  modalNamePlaceholder.innerHTML = 'Имя<span>*</span>';

  const modalLastNameBox = createElement('div', { classList: ['modal__input-box'] }, modalForm);
  const modalLastnameInput = createElement('input', { classList: ['modal__input'] }, modalLastNameBox);
  const modalLastnamePlaceholder = createElement('div', { classList: ['modal__input-placeholder'] }, modalLastNameBox);
  modalLastnamePlaceholder.innerHTML = 'Отчество';

  const modalFooter = createElement('div', { classList: ['modal__footer'] }, modalBox);
  const modalAddClientBox = createElement('div', { classList: ['modal__add-client-box'] }, modalFooter);
  const modalContactsBox = createElement('div', { classList: ['modal__contact-box'] }, modalAddClientBox);
  const modalAddContactBtn = createElement('button', { classList: ['modal__add-contact-btn', 'btn-reset'] }, modalAddClientBox);
  modalAddContactBtn.textContent = 'Добавить контакт'
  const modalErrorMessage = createElement('div', { classList: ['modal__error-message'] }, modalFooter);
  const modalSaveClientbtn = createElement('button', { classList: ['modal__save-client-btn', 'btn-reset'], textContent: 'Сохранить' }, modalFooter);
  const modalCanselBtn = createElement('button', { classList: ['modal__cansel-btn', 'btn-reset'], textContent: 'Отмена' }, modalFooter);
  const modalSaveClientBtnSpiner = createElement('span', { classList: ['modal__save-client-btn-spiner'] })

  if (clientObj) {
    modalSurnameInput.value = clientObj.surname;
    modalNameInput.value = clientObj.name;
    modalLastnameInput.value = clientObj.lastName
    modalSurnamePlaceholder.classList.add('modal__input-placeholder-active')
    modalNamePlaceholder.classList.add('modal__input-placeholder-active')
    modalLastnamePlaceholder.classList.add('modal__input-placeholder-active')
    modalCanselBtn.textContent = 'Удалить'
  }
  modalSurnameInput.addEventListener('input', () => {
    let regexp = /[0-9a-zA-Z!@#$%^&*()_+{}]/
    if (regexp.test(modalSurnameInput.value)) {
      modalSurnameInput.classList.add('modal__input-error')
    } else {
      modalSurnameInput.classList.remove('modal__input-error')
    }
    if (modalSurnameInput.value !== "") {
      modalSurnamePlaceholder.classList.add('modal__input-placeholder-active')
    } else {
      modalSurnamePlaceholder.classList.remove('modal__input-placeholder-active')
    }
    client.surname = modalSurnameInput.value;
  })

  modalNameInput.addEventListener('input', () => {
    let regexp = /[0-9a-zA-Z!@#$%^&*()_+{}]/
    if (regexp.test(modalNameInput.value)) {
      modalNameInput.classList.add('modal__input-error')
    } else {
      modalNameInput.classList.remove('modal__input-error')
    }
    if (modalNameInput.value !== "") {
      modalNamePlaceholder.classList.add('modal__input-placeholder-active')
    } else {
      modalNamePlaceholder.classList.remove('modal__input-placeholder-active')
    }
    client.name = modalNameInput.value;
  })

  modalLastnameInput.addEventListener('input', () => {
    let regexp = /[0-9a-zA-Z!@#$%^&*()_+{}]/
    if (regexp.test(modalLastnameInput.value)) {
      modalLastnameInput.classList.add('modal__input-error')
    } else {
      modalLastnameInput.classList.remove('modal__input-error')
    }
    if (modalLastnameInput.value !== "") {
      modalLastnamePlaceholder.classList.add('modal__input-placeholder-active')
    } else {
      modalLastnamePlaceholder.classList.remove('modal__input-placeholder-active')
    }
    client.lastName = modalLastnameInput.value;
  })

  modalHeaderCloseBtn.addEventListener('click', () => {
    closeModal();
  })

  if (clientObj) {
    modalCanselBtn.addEventListener('click', () => {
      onShowDeleteModal(client.id);
      closeModal();
    })
  } else {
    modalCanselBtn.addEventListener('click', () => {
      closeModal();
    })
  }

  if (clientObj) {
    for (const item of clientObj.contacts) {
      modalContactsBox.prepend(createContactBox(item))
    }
    if (clientObj.contacts.length >= 10) {
      modalAddContactBtn.disabled = true;
      modalAddContactBtn.classList.add('modal__add-contact-btn-disabled');
    }
  }

  modalAddContactBtn.addEventListener('click', () => {
    modalContactsBox.prepend(createContactBox());
    if (client.contacts.length >= 10) {
      modalAddContactBtn.disabled = true
      modalAddContactBtn.classList.add('modal__add-contact-btn-disabled');
    }
  })

  modal.addEventListener('click', (e) => {
    if (!e.composedPath().includes(modalBox)) {
      closeModal();
    }
  })

  if (clientObj) {
    modalSaveClientbtn.addEventListener('click', () => {
      modalSaveClientbtn.style.background = '#8052FF';
      modalSaveClientbtn.prepend(modalSaveClientBtnSpiner);
      onChanche(client);
    })
  } else {
    modalSaveClientbtn.addEventListener('click', () => {
      modalSaveClientbtn.style.background = '#8052FF';
      modalSaveClientbtn.prepend(modalSaveClientBtnSpiner);
      const response = onSave(client);
      response.then(response => {
        if (response == 404) {
          modalErrorMessage.style.display = 'block';
          modalErrorMessage.textContent = `Ошибка ответа сервера: ${response}`
        } else {
          if (response == 422) {
            modalErrorMessage.style.display = 'block';
            modalErrorMessage.textContent = `Ошибка ответа сервера: ${response}`
          } else {
            if (+response < 500) {
              modalErrorMessage.style.display = 'block';
              modalErrorMessage.textContent = `Ошибка ответа сервера: ${response}`
            } else {
              modalErrorMessage.style.display = 'block';
              modalErrorMessage.textContent = `Что-то пошло не так...`
            }
          }
        }
      })
    })
  }

  return modal;
};

function createModalDelete(id, onDelete) {
  function closeModal() {
    modalBox.classList.add('up');
    modal.style.opacity = '0'
    setTimeout(() => {
      modal.innerHTML = '';
      modal.remove();
    }, 300);
  }

  const modal = createElement('div', { classList: ['modal', 'opacity'] });
  setTimeout(() => {
    modal.classList.remove('opacity');
  }, 300);
  const modalBox = createElement('div', { classList: ['modal__box', 'modal__delete-box', 'up-open'] }, modal);
  const modalTitle = createElement('h2', { classList: ['modal__header-title', 'modal__header-title-margin'], textContent: 'Удалить клиента' }, modalBox);
  const modalDesc = createElement('p', { classList: ['modal__header-desc'], textContent: 'Вы действительно хотите удалить клиента?' }, modalBox);
  const modalDeleteBtn = createElement('button', { classList: ['modal__save-client-btn', 'btn-reset'], textContent: 'Удалить' }, modalBox);
  const modalCanselBtn = createElement('button', { classList: ['modal__cansel-btn', 'btn-reset'], textContent: 'Отмена' }, modalBox);
  const modalCloseBtn = createElement('button', { classList: ['modal__header-close-btn', 'btn-reset'] }, modalBox);
  modalCloseBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>'
  const modalDeleteBtnSpiner = createElement('span', { classList: ['modal__save-client-btn-spiner'] })

  modalCanselBtn.addEventListener('click', () => {
    closeModal()
  });

  modalCloseBtn.addEventListener('click', () => {
    closeModal()
  });

  modal.addEventListener('click', (e) => {
    if (!e.composedPath().includes(modalBox)) {
      closeModal();
    }
  });

  modalDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalDeleteBtn.prepend(modalDeleteBtnSpiner);
    modalDeleteBtn.style.background = '#8052FF';
    onDelete(id);
    closeModal();
  })

  return modal
};

async function createClientsApp() {
  const body = document.getElementById('body');
  const searchInput = document.getElementById('searchInput');
  const tableBody = document.getElementById('tableBody');
  const addClientBtn = document.getElementById('addClientBtn');
  const spinerTableBody = createElement('div', { classList: ['spiner'] });

  async function getData(url) {
    tableBody.append(spinerTableBody)

    function sortData(arr) {
      let dir;
      let prop;
      for (const item of sortBtnsArr) {
        if (item.on) {
          prop = item.type;
          if (item.btn.getElementsByTagName('svg')[0].classList.contains('flip')) {
            dir = true
          } else {
            dir = false
          }
        }
      }
      arr.sort(function (a, b) {
        let dirIf = a[prop] < b[prop];
        if (dir == true) dirIf = a[prop] > b[prop];
        if (dirIf == true) return - 1
      })

      return arr

    }

    if (searchInput.value != '') {
      const response = await fetch(`${url}?search=${searchInput.value}`);
      const data = await response.json();
      return sortData(data)
    } else {
      const response = await fetch(url);
      const data = await response.json();
      return sortData(data)
    }
  }

  async function onDelete(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)
  }

  async function onShowChangeModal(id) {
    await fetch(`${url}/${id}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => body.prepend(createModalClient(data, onShowDeleteModal, onChanche, onSave)))
  }

  async function onShowDeleteModal(id) {
    body.prepend(createModalDelete(id, onDelete))
  }

  async function onChanche(client) {
    await fetch(`${url}/${client.id}`, {
      method: 'PATCH',
      body: JSON.stringify(client),
      headers: {
        'Content-type': 'application/json'
      }
    })
    createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)
  }

  async function onSave(client) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    })

    createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)

    return response.status
  }

  const sortBtnsArr = [];
  sortBtnsArr.push({
    type: 'id',
    btn: document.getElementById('sortIdBtn'),
    on: true,
  })
  sortBtnsArr.push({
    type: 'surname',
    btn: document.getElementById('sortNameBtn'),
    on: false,
  })
  sortBtnsArr.push({
    type: 'createdAt',
    btn: document.getElementById('sortCreatedAtBtn'),
    on: false,
  })
  sortBtnsArr.push({
    type: 'updatedAt',
    btn: document.getElementById('sortChengeAtBtn'),
    on: false,
  })

  for (const item of sortBtnsArr) {
    item.btn.addEventListener('click', async () => {
      item.btn.getElementsByTagName('svg')[0].classList.toggle('flip')
      item.on = true;
      const type = item.type
      for (const item of sortBtnsArr) {
        if (!(item.type == type)) {
          item.on = false
        }
      }
      for (const item of sortBtnsArr) {
        if (!(item.type == type)) {
          if (item.btn.getElementsByTagName('svg')[0].classList.contains('flip')) {
            item.btn.getElementsByTagName('svg')[0].classList.remove('flip')
          }
        }

      }
      createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)
    })
  }

  searchInput.addEventListener('input', () => {
    setTimeout(async () => {
      createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)
    }, 300);
  })

  createTableBody(await getData(url), onShowChangeModal, onShowDeleteModal)

  addClientBtn.addEventListener('click', () => {
    body.prepend(createModalClient(null, onShowDeleteModal, onChanche, onSave));
  })
}

createClientsApp();