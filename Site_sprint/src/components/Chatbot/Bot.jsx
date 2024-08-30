import React, { useEffect } from 'react';

const Chatbot = () => {
  // Carregar o script do Dialogflow quando o componente for montado
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Chatbot do Dialogflow */}
      <df-messenger
        chat-title="PrimeBot"
        agent-id="1d841dbd-df65-48e2-a641-64c8e7fcbae9"
        language-code="pt-br"
        style={{ position: 'relative', zIndex: 2 }}  // Certificando que o chatbot está acima dos outros elementos
      ></df-messenger>
    </div>
  );
};

export default Chatbot;
