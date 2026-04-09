import { useState, useEffect, useRef } from 'react';

/* -----------------------------------------------------------------------
   Bilingual conversation scripts
   ----------------------------------------------------------------------- */

interface Message {
  sender: 'ai' | 'customer';
  text: string;
}

const conversations: Record<'fr' | 'en', Message[]> = {
  fr: [
    { sender: 'ai', text: 'Bonjour ! 👋 Bienvenue chez Boulangerie Martin. Comment puis-je vous aider ?' },
    { sender: 'customer', text: 'Bonjour ! Qu\'est-ce que vous proposez aujourd\'hui ?' },
    { sender: 'ai', text: 'Voici notre carte du jour :\n🥖 Baguette tradition — 1,20 €\n🥐 Croissant pur beurre — 1,40 €\n🍞 Pain au levain — 3,50 €\n🍰 Tarte aux pommes — 4,20 €' },
    { sender: 'customer', text: 'Je prends 2 baguettes et 3 croissants' },
    { sender: 'ai', text: 'Parfait ! Votre commande :\n✅ 2x Baguette tradition — 2,40 €\n✅ 3x Croissant pur beurre — 4,20 €\n\n💰 Total : 6,60 €\n\nRetrait ou livraison ?' },
    { sender: 'customer', text: 'Retrait à 9h svp' },
    { sender: 'ai', text: 'Commande confirmée ! 🎉\n\n📍 Retrait à 9h00 chez Boulangerie Martin\n🧾 Total : 6,60 €\n\nÀ tout à l\'heure et bonne journée !' },
  ],
  en: [
    { sender: 'ai', text: 'Hello! 👋 Welcome to Martin\'s Bakery. How can I help you?' },
    { sender: 'customer', text: 'Hi! What do you have today?' },
    { sender: 'ai', text: 'Here\'s today\'s menu:\n🥖 Traditional baguette — €1.20\n🥐 Butter croissant — €1.40\n🍞 Sourdough bread — €3.50\n🍰 Apple tart — €4.20' },
    { sender: 'customer', text: 'I\'ll take 2 baguettes and 3 croissants' },
    { sender: 'ai', text: 'Perfect! Your order:\n✅ 2x Traditional baguette — €2.40\n✅ 3x Butter croissant — €4.20\n\n💰 Total: €6.60\n\nPickup or delivery?' },
    { sender: 'customer', text: 'Pickup at 9am please' },
    { sender: 'ai', text: 'Order confirmed! 🎉\n\n📍 Pickup at 9:00 AM at Martin\'s Bakery\n🧾 Total: €6.60\n\nSee you soon and have a great day!' },
  ],
};

const uiLabels = {
  fr: {
    title: 'Essayez l\'expérience HUGGO',
    next: 'Message suivant',
    restart: 'Recommencer',
    typing: 'En train d\'écrire...',
    completed: 'Conversation terminée',
  },
  en: {
    title: 'Try the HUGGO experience',
    next: 'Next message',
    restart: 'Start over',
    typing: 'Typing...',
    completed: 'Conversation completed',
  },
} as const;

/* -----------------------------------------------------------------------
   Props
   ----------------------------------------------------------------------- */

interface Props {
  locale: 'fr' | 'en';
}

/* -----------------------------------------------------------------------
   Typing indicator
   ----------------------------------------------------------------------- */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#25D366] px-4 py-3 self-start max-w-[80%]">
      <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
      <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
      <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

/* -----------------------------------------------------------------------
   Component
   ----------------------------------------------------------------------- */

export default function ConversationDemo({ locale }: Props) {
  const script = conversations[locale];
  const t = uiLabels[locale];

  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isComplete = visibleCount >= script.length;

  /* Auto-scroll to bottom when messages change */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, isTyping]);

  /* Advance conversation with typing indicator */
  const handleNext = () => {
    if (isComplete || isTyping) return;

    setIsTyping(true);

    // Simulate typing delay (longer for AI messages)
    const nextMessage = script[visibleCount];
    const delay = nextMessage.sender === 'ai' ? 1200 : 600;

    setTimeout(() => {
      setIsTyping(false);
      setVisibleCount((prev) => prev + 1);
    }, delay);
  };

  /* Restart the conversation */
  const handleRestart = () => {
    setVisibleCount(1);
    setIsTyping(false);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Phone frame */}
      <div className="overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-xl">
        {/* WhatsApp-style header */}
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.61l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.55-.684-6.407-1.862l-.357-.214-2.642.886.886-2.642-.214-.357A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Boulangerie Martin
            </p>
            <p className="text-xs text-white/70">HUGGO AI Assistant</p>
          </div>
        </div>

        {/* Chat area */}
        <div
          ref={scrollRef}
          className="flex h-[400px] flex-col gap-3 overflow-y-auto bg-[#ECE5DD] p-4"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
          aria-live="polite"
          aria-label={t.title}
        >
          {/* Time stamp */}
          <div className="mb-2 text-center">
            <span className="inline-block rounded-lg bg-white/80 px-3 py-1 text-xs text-gray-500 shadow-sm">
              {locale === 'fr' ? "Aujourd'hui" : 'Today'}
            </span>
          </div>

          {/* Visible messages */}
          {script.slice(0, visibleCount).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === 'ai'
                    ? 'rounded-tl-sm bg-white text-gray-800'
                    : 'rounded-tr-sm bg-[#DCF8C6] text-gray-800'
                }`}
              >
                {msg.text}
                <span className="mt-1 block text-right text-[10px] text-gray-400">
                  {`${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '01'}`}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>

        {/* Bottom bar with action button */}
        <div className="flex items-center gap-3 border-t border-[var(--border-color)] bg-[#F0F0F0] px-4 py-3">
          {isComplete ? (
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 rounded-full bg-[#075E54] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#064E46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
            >
              {t.restart}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={isTyping}
              className="flex-1 rounded-full bg-green-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isTyping ? t.typing : t.next}
            </button>
          )}
        </div>
      </div>

      {/* Status indicator */}
      {isComplete && (
        <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
          {t.completed}
        </p>
      )}
    </div>
  );
}
